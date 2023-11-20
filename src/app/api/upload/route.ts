import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json(url);
}
