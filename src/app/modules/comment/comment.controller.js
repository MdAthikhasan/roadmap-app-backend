import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse.js";
import { RoadmapItem } from "../roadmapItem/roadmapItem.model.js";
import { Comment } from "./comment.model.js";

const insertComment = async (req, res) => {
  try {
    const { text, roadmapItemId, parent = null } = req.body;

    const newComment = await Comment.create({
      user: req.user?.userId,
      roadmapItemId,
      text,
      parent,
    });

    await RoadmapItem.updateOne(
      { _id: roadmapItemId },
      { $push: { comments: newComment._id } }
    );
    if (parent) {
      await Comment.findByIdAndUpdate(parent, {
        $push: { replies: newComment._id },
      });
    }

    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: "Comment created",
      data: newComment,
    });
  } catch (err) {
    sendResponse(res, {
      status: 401,
      success: false,
      message: "Error creating comment",
      data: null,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { roadmapItemId } = req.query;

    const comments = await Comment.find({
      roadmapItemId,
      parent: null,
    })
      .populate({
        path: "replies",
        populate: [
          { path: "user" },
          {
            path: "replies",
            populate: [
              { path: "user" },
              {
                path: "replies",
                populate: { path: "user" },
              },
            ],
          },
        ],
      })
      .populate("user");

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Comments retrieved",
      data: comments,
    });
  } catch (err) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to retrieve comments",
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { text } = req.body;

    const updated = await Comment.findByIdAndUpdate(
      req.query.commentId,
      { text },
      { new: true }
    );

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Comment updated",
      data: updated,
    });
  } catch (err) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to update comment",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.query;
    const deletedItem = await Comment.findByIdAndDelete(commentId);

    if (deletedItem.parent) {
      await Comment.findByIdAndUpdate(deletedItem.parent.toString(), {
        $pull: { replies: commentId },
      });
    }

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "Comment and replies deleted",
    });
  } catch (err) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to delete comment",
    });
  }
};
export { deleteComment, getComments, insertComment, updateComment };
