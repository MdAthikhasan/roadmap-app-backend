import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse.js";
import { RoadmapItem } from "../roadmapItem/roadmapItem.model.js";
import { Comment } from "./comment.model.js";

// Create comment or reply
const insertComment = async (req, res) => {
  try {
    const { text, roadmapItemId, parent = null } = req.body;

    const newComment = await Comment.create({
      user: req.user?.userId,
      roadmapItemId,
      text,
      parent,
    });
    console.log(newComment);
    await RoadmapItem.updateOne(
      { _id: roadmapItemId },
      { $push: { comments: newComment._id } }
    );
    if (parent) {
      await Comment.findByIdAndUpdate(parent, {
        $push: { replies: newComment._id },
      });
    }
    // If it's a reply, update the parent comment
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: "Comment created",
      data: newComment,
    });
  } catch (err) {
    sendResponse(res, {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error creating comment",
      data: null,
    });
  }
};

// Get nested comments
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

    // const nestedComments = buildNestedComments(comments);

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

// Update comment
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
//previouse code was commented out
// import httpStatus from "http-status";
// import { sendResponse } from "../../utils/sendResponse.js";

// import { RoadmapItem } from "../roadmapItem/roadmapItem.model.js";
// import { Comment } from "./comment.model.js";

// const insertComment = async (req, res) => {
//   try {
//     const data = await Comment.create(req.body);
//     await RoadmapItem.updateOne(
//       {
//         _id: data.roadmapItemId,
//       },
//       {
//         $push: { comments: data._id },
//       }
//     );
//     sendResponse(res, {
//       status: httpStatus.OK,
//       success: true,
//       message: "Comment created successfully",
//       data: data,
//     });
//   } catch (error) {
//     sendResponse(res, {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: "Failed to create comment",
//       data: null,
//     });
//   }
// };
// const updateComment = async (req, res) => {
//   try {
//     const { commentId, text } = req.body;
//     const updatedComment = await Comment.findByIdAndUpdate(
//       commentId,
//       { text },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedComment) {
//       return sendResponse(res, {
//         status: httpStatus.NOT_FOUND,
//         success: false,
//         message: "Comment not found",
//         data: null,
//       });
//     }

//     sendResponse(res, {
//       status: httpStatus.OK,
//       success: true,
//       message: "Comment updated successfully",
//       data: updatedComment,
//     });
//   } catch (error) {
//     sendResponse(res, {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: "Failed to update comment",
//       data: null,
//     });
//   }
// };
// const deleteComment = async (req, res) => {
//   try {
//     const { commentId } = req.body;
//     const deletedComment = await Comment.findByIdAndDelete(commentId);

//     if (!deletedComment) {
//       return sendResponse(res, {
//         status: httpStatus.NOT_FOUND,
//         success: false,
//         message: "Comment not found",
//         data: null,
//       });
//     }

//     // Also remove the comment reference from RoadmapItem
//     await RoadmapItem.updateOne(
//       { _id: deletedComment.roadmapItemId },
//       { $pull: { comments: deletedComment._id } }
//     );

//     sendResponse(res, {
//       status: httpStatus.OK,
//       success: true,
//       message: "Comment deleted successfully",
//       data: deletedComment,
//     });
//   } catch (error) {
//     sendResponse(res, {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: "Failed to delete comment",
//       data: null,
//     });
//   }
// };

// const getComments = async (req, res) => {
//   try {
//     const comments = await Comment.find();

//     sendResponse(res, {
//       status: httpStatus.OK,
//       success: true,
//       message: "Comments retrieved successfully",
//       data: comments,
//     });
//   } catch (error) {
//     sendResponse(res, {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: "Failed to retrieve comments",
//       data: null,
//     });
//   }
// };
// // utility function: buildNestedComments.js
// function buildNestedComments(comments, parentId = null) {
//   const nested = [];
//   for (const comment of comments) {
//     if (
//       (comment.parent?.toString() || null) === (parentId?.toString() || null)
//     ) {
//       const children = buildNestedComments(comments, comment._id);
//       nested.push({ ...comment._doc, replies: children });
//     }
//   }
//   return nested;
// }

// // controllers/comment.controller.js
// const getNestedComments = async (req, res) => {
//   const { roadmapItemId } = req.params;

//   const comments = await Comment.find({ roadmapItemId })
//     .populate("user", "name")
//     .sort({ createdAt: 1 });

//   const nested = buildNestedComments(comments);
//   res.status(200).json({ success: true, data: nested });
// };
// // routes/post-comment
// const postComment = async (req, res) => {
//   const { roadmapItemId, text, parent = null } = req.body;
//   const userId = req.user._id;

//   const newComment = await Comment.create({
//     user: userId,
//     text,
//     roadmapItemId,
//     parent, // reply হলে parent id দিতে হবে
//   });

//   res.status(201).json({ success: true, data: newComment });
// };

// export { deleteComment, getComments, insertComment, updateComment };
