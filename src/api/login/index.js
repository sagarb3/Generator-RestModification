import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { schema } from "./model";
export Login, { schema } from "./model";
import LoginController from "./controller";
import { asyncMiddleware } from "../../services/asynMiddleware";
const router = new Router();
router.post(
  "/auth",
  body({
    username: { type: String },
    password: { type: String }
  }),
  asyncMiddleware(LoginController.authenticateUser)
);

router.post(
  "/",
  body({
    username: { type: String },
    password: { type: String }
  }),
  asyncMiddleware(LoginController.createUser)
);

export default router;
