import fs from 'fs-extra';
import { cloudinaryUploadImg, cloudinaryDeleteImg } from '../utils/cloudinary.js';


export const uploadImages = async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload product image", error });
  }
};
export const deleteImages = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product image", error });
  }
};

