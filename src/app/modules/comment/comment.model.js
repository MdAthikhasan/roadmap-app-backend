// models/comment.model.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    roadmapItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "RoadmapItem",
    },
    text: { type: String, required: true, maxlength: 300 },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
