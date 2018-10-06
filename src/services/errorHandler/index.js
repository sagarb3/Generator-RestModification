import ApiResponse from "../apiResponse";
export function bodyErrorHandler() {
  return function(err, req, res, next) {
    if (req.bodymen && req.bodymen.error) {
      var errorList = [];
      var err = "";
      if (Array.isArray(req.bodymen.error)) {
        for (let err of req.bodymen.error) {
          errorList.push(err.message);
        }
      } else {
        err = req.bodymen.error.message;
      }
      res.status(400).json(
        ApiResponse.response({
          err: errorList.length > 0 || err,
          res: null
        })
      );
    } else {
      next(err);
    }
  };
}

export function queryErrorHandler() {
  return function(err, req, res, next) {
    if (req.querymen && req.querymen.error) {
      var errorList = [];
      var err = "";
      if (Array.isArray(req.querymen.error)) {
        for (let err of req.querymen.error) {
          errorList.push(err.message);
        }
      } else {
        err = req.querymen.error.message;
      }
      res.status(400).json(
        ApiResponse.response({
          err: errorList.length > 0 || err,
          res: null
        })
      );
    } else {
      next(err);
    }
  };
}

export function genericClientHttpErrorHandler() {
  return function(err, req, res, next) {
    if (req.xhr) {
      res.status(500).json(ApiResponse.response({ err: err.message }));
    } else {
      next(err);
    }
  };
}

export function catchAllErrorHandler() {
  return function(err, req, res, next) {
    res.status(500).json(ApiResponse.response({ err: err.message }));
  };
}
