import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },

  {
    timestamps: true,
  }
);
// userSchema.statics.isUserExistByCustomId = async function (id) {
//   return await UserModel.findOne({ id }).select("+password");
// };

// Hypothetical function to hash a password

export const UserModel = model("UserModel", userSchema);
