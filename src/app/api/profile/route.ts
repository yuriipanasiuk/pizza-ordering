import { getServerSession } from "next-auth";

import { databaseConnection } from "../connect/mongoDb";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/User";

export async function PUT(req: Request) {
  await databaseConnection();

  const { name, image } = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const { _id } = await User.findOne({ email });

  if (!name || !_id || !image) {
    return null;
  }

  console.log("name", name);
  console.log("id", _id);
  console.log("image", image);

  await User.findByIdAndUpdate({ _id }, { name, image }, { new: true });

  return Response.json(true);
}
