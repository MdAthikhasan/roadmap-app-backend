import express from "express";
import {
  getComments,
  insertComment,
  updateComment,
  deleteComment,
} from "./comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.post("/create-comment", insertComment);
commentRouter.put("/update-comment", updateComment);
commentRouter.delete("/delete-comment", deleteComment);

export default commentRouter;
