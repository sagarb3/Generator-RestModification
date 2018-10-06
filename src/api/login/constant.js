class Constants {
  static get ERROR_CONSTANT() {
    return {
      INVALID_PASSWORD: "Credentials Invalid",
      USERNOTFOUND: "User does not exist"
    };
  }
  static get SUCCESS_CONSTANT() {
    return {
      SUCCESSLOGIN: "User Successfully Logged In"
    };
  }
}

module.exports = Constants;
