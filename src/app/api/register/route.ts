import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";

import { IUser } from "@/interface/user.interface";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function POST(req: Request) {
  await mongoose.connect(MONGODB_URI);

  const body: IUser = await req.json();
  const hashPassword = await bcrypt.hash(body.password, 10);

  const createUser = await User.create({
    email: body.email,
    password: hashPassword,
  });

  return Response.json(createUser);
}
