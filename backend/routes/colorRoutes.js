import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createColor, deleteColor, getallColor, getColor, updateColor } from '../controllers/colorController.js';

const router = express.Router();

router.post("/create-color", authMiddleware, isAdmin, createColor);
router.put("/update-color/:id", authMiddleware, isAdmin, updateColor);
router.delete("/delete-color/:id", authMiddleware, isAdmin, deleteColor);
router.get("/get-color/:id", getColor);
router.get("/getall-color", getallColor);

export default router;
