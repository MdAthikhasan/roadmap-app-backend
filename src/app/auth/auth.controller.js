import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "./user.model";
import { sendResponse } from "../utils/sendResponse";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Login successful",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};
export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Logout successful",
    data: null,
  });
};
