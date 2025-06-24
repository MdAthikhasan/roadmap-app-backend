import express from "express";
import {
  deleteComment,
  getComments,
  insertComment,
  updateComment,
} from "./comment.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/create-comment", authMiddleware, insertComment);
commentRouter.get("/", getComments);
commentRouter.put("/update-comment", authMiddleware, updateComment);
commentRouter.delete("/delete-comment", authMiddleware, deleteComment);
export default commentRouter;

//previous code was commented out
// import express from "express";
// import authMiddleware from "../../middlewares/authMiddleware.js";
// import {
//   deleteComment,
//   getComments,
//   insertComment,
//   updateComment,
// } from "./comment.controller.js";

// const commentRouter = express.Router();

// commentRouter.get("/", getComments);
// commentRouter.post("/create-comment", authMiddleware, insertComment);
// commentRouter.put("/update-comment", updateComment);
// commentRouter.delete("/delete-comment", deleteComment);

// export default commentRouter;
