import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { productImgResize, uploadPhoto } from '../middlewares/uploadImage.js';
import { uploadImages } from '../controllers/uploadController.js';

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);


export default router;
