import express from "express";

import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  getAllRoadmapItems,
  insertRoadmapItem,
  toggleUpvote,
} from "./roadmapItem.controller.js";
const roadmapRouter = express.Router();

roadmapRouter.get("/", getAllRoadmapItems);
roadmapRouter.post("/create-item", insertRoadmapItem);
roadmapRouter.put("/:id/upvote", authMiddleware, toggleUpvote);

export default roadmapRouter;
