import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "oyofglqf",
  api_key: process.env.CLOUDINARY_API_KEY || "567457617253511",
  api_secret: process.env.CLOUDINARY_API_SECRET || "6kdCzWUdhoLaqOKVE0mHgWV7v6c",
  secure: true,
});

export default cloudinary;

/**
 * Upload a Buffer or Data URI to Cloudinary
 * @param {Buffer|string} file - Image file buffer or base64 data string
 * @param {string} folder - Target folder in Cloudinary
 * @returns {Promise<{ url: string, public_id: string }>}
 */
export async function uploadToCloudinary(file, folder = "netarhat_tourism") {
  return new Promise((resolve, reject) => {
    if (Buffer.isBuffer(file)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
      uploadStream.end(file);
    } else if (typeof file === "string") {
      cloudinary.uploader.upload(
        file,
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
    } else {
      reject(new Error("Unsupported file format for Cloudinary upload"));
    }
  });
}

