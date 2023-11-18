import bcrypt from "bcryptjs";
import User from "@/app/models/User";

import { databaseConnection } from "../connect/mongoDb";
import { IUser } from "@/interface/user.interface";

export async function POST(req: Request) {
  const { email, password }: IUser = await req.json();

  await databaseConnection();

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    email,
    password: hashPassword,
  });

  return Response.json(createUser);
}
