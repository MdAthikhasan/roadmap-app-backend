import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("authmiddleware not called", token);
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "You are not authenticated plz sign-in",
        data: null,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("authmiddlewarecalled");

    next();
  } catch (err) {
    sendResponse(res, {
      status: 404,
      success: false,
      message: "invalid",
      data: null,
    });
  }
};
export default authMiddleware;
