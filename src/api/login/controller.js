import LoginService from "./service";
import { success } from "../../services/response";

class LoginController {
  static async authenticateUser(
    {
      bodymen: { body }
    },
    res,
    next
  ) {
    try {
      const result = await LoginService.authenticate(body);
      return success(res, result, 201);
    } catch (err) {
      next(err);
    }
  }
  static async createUser(
    {
      bodymen: { body }
    },
    res,
    next
  ) {
    try {
      const result = await LoginService.createUser(body);
      success(res, result, 201);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
