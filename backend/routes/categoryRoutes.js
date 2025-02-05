import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { createCategory, deleteCategory, getallCategory, getCategory, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create-category',authMiddleware, isAdmin, createCategory);
router.get('/get-category/:id', getCategory);
router.get('/getall-category', getallCategory);
router.put('/update-category/:id',authMiddleware, isAdmin, updateCategory);
router.delete('/delete-category/:id',authMiddleware, isAdmin, deleteCategory);


export default router;