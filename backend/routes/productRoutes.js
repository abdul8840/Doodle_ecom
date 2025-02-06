import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getaProduct, updateProduct } from '../controllers/productController.js'

const router = express.Router()

router.post('/create-product', createProduct);
router.get("/get-product/:id", getaProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

router.get("/getall-product", getAllProduct);

export default router;