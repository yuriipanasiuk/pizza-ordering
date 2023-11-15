import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/app/models/User";

import { IUserRegister } from "@/interface/user.interface";

const DB_HOST = process.env.DB_HOST || "";

export async function POST(req: Request) {
  mongoose.connect(DB_HOST);

  const body: IUserRegister = await req.json();
  const hashPassword = await bcrypt.hash(body.password, 10);

  const createUser = await User.create({
    email: body.email,
    password: hashPassword,
  });

  return Response.json(createUser);
}
