import { getServerSession } from "next-auth";

import { databaseConnection } from "../connect/mongoDb";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/User";

export async function PUT(req: Request) {
  await databaseConnection();

  const { name } = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const { _id } = await User.findOne({ email });

  if (!name || !_id) {
    return null;
  }
  await User.findByIdAndUpdate({ _id }, { name }, { new: true });

  return Response.json(true);
}
