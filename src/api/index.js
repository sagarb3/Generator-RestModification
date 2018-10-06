import { Router } from "express";
import login from "./login";
const router = new Router();
router.use("/login", login);
export default router;
