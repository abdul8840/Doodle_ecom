import fs from 'fs-extra';
import { cloudinaryUploadImg, cloudinaryDeleteImg } from '../utils/cloudinary.js';


// Function to upload images to Cloudinary
export const uploadImages = async (req, res) => {
  try {
    // Helper function for uploading images
    const uploader = (path) => cloudinaryUploadImg(path);  // Removed the 'images' argument here
    const urls = [];
    const files = req.files;

    // Iterate through all files and upload them to Cloudinary
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);

      // Delete the local file after uploading to Cloudinary (use async method)
      await fs.unlink(path);
    }

    // Map and return the image URLs
    const images = urls.map((file) => file);
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading images' });
  }
};


// Function to delete images from Cloudinary
// Function to delete images from Cloudinary
export const deleteImages = async (req, res) => {
  const { id } = req.params;
  try {
    // Call the function to delete the image from Cloudinary
    const deleted = await cloudinaryDeleteImg(id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting image' });
  }
};

