import { Router } from "express";
import { loginController, userLogout } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/logout", userLogout);
export default authRouter;
