// models/RoadmapItem.js
import mongoose from "mongoose";

const roadmapItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    status: { type: String, enum: ["Planned", "In Progress", "Completed"] },
    upvotes: { type: Number, default: 0 },
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

// const roadmapItemsData = [
//   {
//     id: 1,
//     title: "Add Dark Mode",
//     description: "Implement dark mode across the platform",
//     category: "UI",
//     status: "In Progress",
//     upvotes: 10,
//     comments: [
//       {
//         user: "Alice",
//         text: "Dark mode is essential for night work.",
//         replies: [
//           {
//             user: "Bob",
//             text: "Totally agree with you!",
//             replies: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Mobile App",
//     description: "Develop a mobile version of the platform",
//     category: "Mobile",
//     status: "Planned",
//     upvotes: 18,
//     comments: [],
//   },
// ];
