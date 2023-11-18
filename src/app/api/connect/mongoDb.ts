import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

export const databaseConnection = async () => {
  await mongoose.connect(MONGODB_URI);
};
