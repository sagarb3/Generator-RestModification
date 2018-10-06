import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import {
  bodyErrorHandler,
  queryErrorHandler,
  genericClientHttpErrorHandler,
  catchAllErrorHandler
} from "../errorHandler";
import { env } from "../../config";

export default (apiRoot, routes) => {
  const app = express();

  /* istanbul ignore next */
  if (env === "production" || env === "development") {
    app.use(cors());
    app.use(compression());
    app.use(morgan("dev"));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());
  app.use(genericClientHttpErrorHandler());
  app.use(catchAllErrorHandler());
  return app;
};
