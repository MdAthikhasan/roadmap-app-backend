import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { sendResponse } from "../../utils/sendResponse";
import { UserModel } from "./user.model";
export const userController = async (req, res) => {
  const { email } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const userData = {
    ...req.body,
    password: bcrypt.hash(req.body?.password, Number(10)),
  };
  const newUser = await UserModel.create(userData);

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });
  sendResponse(res, {
    status: 200,
    success: true,
    message: "user succesfully created",
    data: newUser,
  });
};
