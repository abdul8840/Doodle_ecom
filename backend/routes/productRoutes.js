import express from 'express'
import { addToWishlist, createProduct, deleteProduct, getAllProduct, getaProduct, rating, updateProduct } from '../controllers/productController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/create-product', authMiddleware, isAdmin, createProduct);
router.get("/get-product/:id", getaProduct);
router.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/getall-product", getAllProduct);

router.put("/wishlist", authMiddleware, addToWishlist);

router.put("/rating", authMiddleware, rating);

export default router;