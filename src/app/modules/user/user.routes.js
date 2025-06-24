import express from "express";
import { validator } from "../../middlewares/validationRequest.js";
import {
  loginController,
  signupController,
  logoutController,
} from "./user.controller.js";
import { userSchemaValidation } from "./user.validation.js";
const userRouter = express.Router();
//army middlewareDef

// route defination
userRouter.post("/sign_up", validator(userSchemaValidation), signupController);
userRouter.post("/sign_in", loginController);
userRouter.post("/log_out", logoutController);
export default userRouter;
