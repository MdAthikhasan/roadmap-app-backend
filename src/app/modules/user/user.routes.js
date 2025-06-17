import express from "express";
import { userController } from "./user.controller";
import { userSchemaValidation } from "./user.validation";
const userRouter = express.Router();
//army middlewareDef

// route defination
userRouter.post("/sign-up", userSchemaValidation, userController);

export default userRouter;
