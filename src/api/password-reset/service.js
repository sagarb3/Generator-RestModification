import { PasswordReset } from ".";
import { uid } from "rand-token";
import { findUserByEmail, resetUserPasswordById } from "../login/service";
import { passwordResetmail } from "../email-manager/service";
import { domainName } from "../../config";
export const createResetPasswordLink = async params => {
  try {
    const { email } = params;
    const user = await findUserByEmail({ email });
    const newEntry = await PasswordReset.create({
      uuid: uid(32),
      userId: user.id
    });
    const { uuid } = newEntry;
    const emailResult = await passwordResetmail({
      to: email,
      replacements: {
        resetLink: `${domainName}/${uuid}`
      }
    });
    return newEntry;
  } catch (err) {
    throw err;
  }
};

export const verifyPassword = async params => {
  try {
    const { uuid, password } = params;
    const findEntry = await PasswordReset.findOne({
      uuid
    });
    if (!findEntry) {
      throw "Link Invalid";
    }
    const { userId } = findEntry;
    const deletePasswordEntry = await PasswordReset.remove({
      uuid
    });
    const resetResult = await resetUserPasswordById({
      id: userId,
      password
    });
    return resetResult;
  } catch (err) {
    throw err;
  }
};
