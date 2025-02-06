import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getaProduct, updateProduct } from '../controllers/productController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/create-product', authMiddleware, isAdmin, createProduct);
router.get("/get-product/:id", getaProduct);
router.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/getall-product", getAllProduct);

export default router;