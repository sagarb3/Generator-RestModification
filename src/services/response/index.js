import { clearFile } from "../clearFiles";
import ApiResponse from "../apiResponse";
export const success = (res, entity, status) => {
  if (entity) {
    res.status(status || 200).json(
      ApiResponse.response({
        res: entity
      })
    );
  }
};

export const notFound = res => entity => {
  if (entity) {
    return entity;
  }
  res.status(404).end();
  return null;
};

export const authorOrAdmin = (res, user, userField) => entity => {
  if (entity) {
    const isAdmin = user.role === "admin";
    const isAuthor = entity[userField] && entity[userField].equals(user.id);
    if (isAuthor || isAdmin) {
      return entity;
    }
    res.status(401).end();
  }
  return null;
};

export const download = (res, filePath) => {
  res.status(200).download(filePath);
  res.on("finish", function() {
    clearFile(filePath);
    return null;
  });
  return null;
};
