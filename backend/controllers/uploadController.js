import fs from 'fs-extra';  // Import fs module
import asyncHandler from 'express-async-handler';  // Import asyncHandler
import { cloudinaryUploadImg, cloudinaryDeleteImg } from '../utils/cloudinary';  // Import custom utility functions

// Function to upload images to Cloudinary
const uploadImages = asyncHandler(async (req, res) => {
  try {
    // Helper function for uploading images
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    const urls = [];
    const files = req.files;

    // Iterate through all files and upload them to Cloudinary
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);

      // Delete the local file after uploading to Cloudinary
      fs.unlinkSync(path);
    }

    // Map and return the image URLs
    const images = urls.map((file) => file);
    res.json(images);
  } catch (error) {
    throw new Error(error);  // Throw error if something goes wrong
  }
});

// Function to delete images from Cloudinary
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // Call the function to delete image from Cloudinary
    const deleted = await cloudinaryDeleteImg(id, 'images');
    res.json({ message: 'Deleted' });  // Respond with success message
  } catch (error) {
    throw new Error(error);  // Throw error if something goes wrong
  }
});

// Export the functions for use in other parts of the application
export { uploadImages, deleteImages };
