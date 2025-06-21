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
userRouter.post("/signup", validator(userSchemaValidation), signupController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);
export default userRouter;
