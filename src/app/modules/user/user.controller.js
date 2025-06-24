import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserModel } from "./user.model.js";

// SIGNUP
const signupController = async (req, res) => {
  try {
    const isExitsedUser = await UserModel.findOne({ email: req.body.email });

    if (isExitsedUser) {
      return sendResponse(res, {
        status: 409,
        success: false,
        message: "Email already in use!",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    newUser.password = undefined;

    sendResponse(res, {
      status: 201,
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    sendResponse(res, {
      status: 500,
      success: false,
      message: "Failed to create user",
      data: null,
    });
  }
};

const loginController = async (req, res) => {
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
    // res.cookie("token", token, {
    //   sameSite: "None",
    //   secure: true,
    //   path: "/",
    //   maxAge: 10 * 24 * 60 * 60 * 1000,
    // });

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Login successfully",
      data: token,
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
const logoutController = (req, res) => {
  try {
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Logout successful",
      data: null,
    });
  } catch (error) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: "Logout failed",
      data: null,
    });
  }
};

export { loginController, logoutController, signupController };
