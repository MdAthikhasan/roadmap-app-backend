// models/RoadmapItem.js
import mongoose from "mongoose";

const roadmapItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Completed"],
      default: "Planned",
    },
    upvotes: { type: Number, default: 0 },
    upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const RoadmapItem = mongoose.model("RoadmapItem", roadmapItemSchema);
