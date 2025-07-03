import formatZodError from "../utils/formatZodError.js";
import { sendResponse } from "../utils/sendResponse.js";

const globarErrorHandler = (err, req, res, next) => {
  console.log("errooo", err);

  if (err.name === "ZodError") {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Validation failed",
      data: formatZodError(err),
    });
  }

  console.error("Unhandled Error:", err);
  return sendResponse(res, {
    status: 500,
    success: false,
    message: "Something went wrong",
    data: null,
  });
};

export default globarErrorHandler;
