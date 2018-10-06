import { Login } from ".";
import { userToken } from "../../services/jwt";
import Constants from "./constant";

class LoginService {
  static async authenticate(params) {
    try {
      const { username, password } = params;
      const user = await Login.findOne({ username });
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
  }
  static async createUser(params) {
    try {
      const user = await Login.create(params);
      console.log("user created");
      return user.view();
    } catch (err) {
      console.log("create user error");
      throw err;
    }
  }
}

module.exports = LoginService;
