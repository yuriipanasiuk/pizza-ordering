import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    email: { type: String, require: true, unique: true },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = model("user", userModel);
