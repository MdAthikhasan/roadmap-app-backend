import express from "express";

import {
  getAllRoadmapItems,
  insertRoadmapItem,
} from "./roadmapItem.controller.js";
const roadmapRouter = express.Router();

roadmapRouter.get("/", getAllRoadmapItems);
roadmapRouter.post("/create-item", insertRoadmapItem);

export default roadmapRouter;
