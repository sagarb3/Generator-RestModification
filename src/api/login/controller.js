import { authenticateUser, createUser } from "./service";
import { success } from "../../services/response";

export const authenticateUserCtrl = async ({ bodymen: { body } }, res) => {
  const result = await authenticateUser(body);
  return success(res, result, 201);
};
export const createUserCtrl = async ({ bodymen: { body }, res }) => {
  const result = await createUser(body);
  return success(res, result, 201);
};
