import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    roadmapItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: { type: String, required: true, maxlength: 300 },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Comment = mongoose.model("Comment", commentSchema);

const replySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    text: { type: String, required: true, maxlength: 300 },
  },
  {
    timestamps: true,
  }
);
export const Reply = mongoose.model("Reply", replySchema);
