const ERROR_CONSTANT = {
  JSONERROR: "JSON CONVERSION FAILED"
};

class ApiResponse {
  static get ERROR_CONSTANT() {
    return ERROR_CONSTANT;
  }
  static response(params) {
    const { res, err } = params;
    try {
      return {
        error: err || null,
        res: res || null
      };
    } catch (err) {
      return {
        error: ERROR_CONSTANT.JSONERROR,
        res: null
      };
    }
  }
}

module.exports = ApiResponse;
