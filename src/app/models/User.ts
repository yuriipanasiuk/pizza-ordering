import mongoose, { Schema, model, models } from "mongoose";

mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      require: [true, "Password id required"],
    },
  },
  { timestamps: true, versionKey: false }
);

const User = models.User || model("User", userSchema);

export default User;
