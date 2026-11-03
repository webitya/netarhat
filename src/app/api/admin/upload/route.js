import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const folder = formData.get("folder") || "netarhat_tourism";
    const uploadResult = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      publicId: uploadResult.public_id,
      message: "Image uploaded to Cloudinary successfully",
    });
  } catch (error) {
    console.error("Cloudinary upload API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}

