import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { schema } from "./model";
export Login, { schema } from "./model";
import { authenticateUserCtrl, createUserCtrl } from "./controller";
import { asyncMiddleware } from "../../services/asynMiddleware";
const router = new Router();
router.post(
  "/auth",
  body({
    email: { type: String },
    password: { type: String }
  }),
  asyncMiddleware(authenticateUserCtrl)
);

router.post(
  "/",
  body({
    name: { type: String },
    email: { type: String },
    password: { type: String }
  }),
  asyncMiddleware(createUserCtrl)
);

export default router;
