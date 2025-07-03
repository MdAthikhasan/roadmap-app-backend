import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse.js";
import { RoadmapItem } from "./roadmapItem.model.js";

const getAllRoadmapItems = async (req, res) => {
  const data = await RoadmapItem.find().populate({
    path: "comments",
    populate: {
      path: "user",
      model: "UserModel",
      select: "name email",
    },
  });

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
const toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const item = await RoadmapItem.findById(id);

    if (!item) {
      return sendResponse(res, {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Roadmap item not found",
      });
    }

    const hasUpvoted = item.upvotedBy?.includes(userId);
    console.log("hasUpvoted", hasUpvoted);
    if (hasUpvoted) {
      item.upvotes--;
      item.upvotedBy.pull(userId);
    } else {
      item.upvotes++;
      item.upvotedBy.push(userId);
    }

    await item.save();

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: hasUpvoted
        ? "Upvote removed successfully"
        : "Upvote added successfully",
      data: {
        upvotes: item.upvotes,
        hasUpvoted: !hasUpvoted,
      },
    });
  } catch (error) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to toggle upvote",
    });
  }
};

export { getAllRoadmapItems, insertRoadmapItem, toggleUpvote };
