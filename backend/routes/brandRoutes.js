import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createBrand, deleteBrand, getallBrand, getBrand, updateBrand } from '../controllers/brandController.js';

const router = express.Router();

router.post("/create-brand", authMiddleware, isAdmin, createBrand);
router.put("/update-brand/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/delete-brand/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/get-brand/:id", getBrand);
router.get("/getall-brand/", getallBrand);


export default router;