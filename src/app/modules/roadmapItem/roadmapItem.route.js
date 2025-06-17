import express from "express";

import { getAllRoadmapItems } from "./roadmapItem.controller";
const roadmapRouter = express.Router();

roadmapRouter.get("/", getAllRoadmapItems);

roadmapRouter.delete("/:id", deleteFaculty);

export default  roadmapRouter;
