import cloudinary from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

// Set Cloudinary configuration from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// Upload image to Cloudinary
export const cloudinaryUploadImg = async (fileToUpload) => {
  try {
    const result = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto", // This ensures all file types (images, videos, etc.) are handled
    });
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

// Delete image from Cloudinary
export const cloudinaryDeleteImg = async (fileToDelete) => {
  try {
    const result = await cloudinary.uploader.destroy(fileToDelete, {
      resource_type: "auto", // Ensure all resource types are handled
    });
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};
