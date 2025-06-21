import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse.js";
import { RoadmapItem } from "./roadmapItem.model.js";

const getAllRoadmapItems = async (req, res) => {
  const data = await RoadmapItem.find().populate("comments");

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All roadmapitem retrived from DB successfully",
    data: data,
  });
};
const insertRoadmapItem = async (req, res) => {
  const itemData = await RoadmapItem.create(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Roadmap item created successfully",
    data: itemData,
  });
};
export { getAllRoadmapItems, insertRoadmapItem };
