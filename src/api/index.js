import { Router } from "express";
import login from "./login";
import passwordReset from "./password-reset";
const router = new Router();
router.use("/login", login);
router.use("/passwordReset", passwordReset);
export default router;
