import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse.js";

import { RoadmapItem } from "../roadmapItem/roadmapItem.model.js";
import { Comment } from "./comment.model.js";

const insertComment = async (req, res) => {
  try {
    const data = await Comment.create(req.body);
    await RoadmapItem.updateOne(
      {
        _id: data.roadmapItemId,
      },
      {
        $push: { comments: data._id },
      }
    );
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Comment created successfully",
      data: data,
    });
  } catch (error) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to create comment",
      data: null,
    });
  }
};
const updateComment = async (req, res) => {
  try {
    const { commentId, text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedComment) {
      return sendResponse(res, {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Comment not found",
        data: null,
      });
    }

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to update comment",
      data: null,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return sendResponse(res, {
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "Comment not found",
        data: null,
      });
    }

    // Also remove the comment reference from RoadmapItem
    await RoadmapItem.updateOne(
      { _id: deletedComment.roadmapItemId },
      { $pull: { comments: deletedComment._id } }
    );

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Comment deleted successfully",
      data: deletedComment,
    });
  } catch (error) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to delete comment",
      data: null,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to retrieve comments",
      data: null,
    });
  }
};

export { deleteComment, getComments, insertComment, updateComment };
