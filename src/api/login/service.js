import { Login } from ".";
import { userToken } from "../../services/jwt";
import Constants from "./constant";

const authenticateUser = async params => {
  try {
    const { email, password } = params;
    const user = await Login.findOne({ email });
    if (!user) {
      throw new Error(Constants.ERROR_CONSTANT.USERNOTFOUND);
    }
    let isPasswordValid = await user.authenticate(password);
    if (!isPasswordValid) {
      throw new Error(Constants.ERROR_CONSTANT.INVALID_PASSWORD);
    }
    const newToken = await userToken({
      id: user._id
    });
    console.log("service done");
    return {
      token: newToken
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createUser = async params => {
  try {
    const user = await Login.create(params);
    console.log("user created");
    return user.view();
  } catch (err) {
    console.log("create user error");
    throw err;
  }
};

const findUserByEmail = async params => {
  try {
    const { email } = params;
    const user = await Login.findOne({ email });
    return user.view(true);
  } catch (err) {
    throw err;
  }
};
const resetUserPasswordById = async params => {
  try {
    const { id, password } = params;
    const user = await Login.findById(id);
    const updateRes = Object.assign(user, { password }).save();
    return updateRes;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  authenticateUser,
  createUser,
  findUserByEmail,
  resetUserPasswordById
};
