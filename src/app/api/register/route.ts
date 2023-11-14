import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/app/models/User";

interface IUser {
  email: string;
  password: string;
}

const DB_HOST: string = process.env.DB_HOST as string;

export async function POST(req: Request) {
  mongoose.connect(DB_HOST);

  const body: IUser = await req.json();
  const hashPassword = await bcrypt.hash(body.password, 10);

  const createUser = await User.create({
    email: body.email,
    password: hashPassword,
  });

  return Response.json(createUser);
}
