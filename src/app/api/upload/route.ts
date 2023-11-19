import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { databaseConnection } from "../connect/mongoDb";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/User";
import cloudinary from "../utils/cloudinary";
import { cloudinaryUploadResponse } from "@/interface/cloudinary.interface";

export async function PATCH(req: NextRequest) {
  const data = await req.formData();

  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ succsess: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResponse = new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

    uploadStream.write(buffer);
    uploadStream.end();
  });

  const { url } = (await uploadResponse) as cloudinaryUploadResponse;
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  await databaseConnection();

  const { _id } = await User.findOne({ email });

  if (!url || !_id) {
    return null;
  }

  const response = await User.findByIdAndUpdate(
    { _id },
    { image: url },
    { new: true }
  );

  return NextResponse.json(response);
}
