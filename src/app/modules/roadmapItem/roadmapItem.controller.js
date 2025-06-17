import httpStatus from "http-status";
import { RoadmapItem } from "./roadmapItem.model";
import { sendResponse } from "../../utils/sendResponse";

const getAllRoadmapItems = async (req, res) => {
  const data = await RoadmapItem.find().populate("Comment");

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All roadmapitem retrived from DB successfully",
    data: data,
  });
};

export { getAllRoadmapItems };
