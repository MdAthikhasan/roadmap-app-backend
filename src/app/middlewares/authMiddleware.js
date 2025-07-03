import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(res, {
      status: 401,
      success: false,
      message: "You are not authenticated plz sign-in",
      data: null,
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "null" || token === "undefined") {
    return sendResponse(res, {
      status: 401,
      success: false,
      message: "You are not authenticated plz sign-in",
      data: null,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, {
      status: 401,
      success: false,
      message:
        error.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
      data: null,
    });
  }
};
export default authMiddleware;
