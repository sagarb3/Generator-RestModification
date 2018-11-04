import { success } from "../../services/response";
import { createResetPasswordLink, verifyPassword } from "./service";

export const createResetPasswordLinkCtrl = async (
  { bodymen: { body } },
  res
) => {
  const result = await createResetPasswordLink(body);
  return success(res, result, 201);
};

export const verifyPasswordCtrl = async ({ querymen: { query } }, res) => {
  const result = await verifyPassword(query);
  return success(res, result, 201);
};
