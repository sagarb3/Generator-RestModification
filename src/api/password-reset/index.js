import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { schema } from "./model";
export PasswordReset, { schema } from "./model";
import { asyncMiddleware } from "../../services/asynMiddleware";
import { createResetPasswordLinkCtrl, verifyPasswordCtrl } from "./controller";
const router = new Router();
router.get(
  "/verify",
  query({
    uuid: { type: String },
    password: { type: String }
  }),
  asyncMiddleware(verifyPasswordCtrl)
);
router.post(
  "/reset",
  body({
    email: { type: String }
  }),
  asyncMiddleware(createResetPasswordLinkCtrl)
);
export default router;
