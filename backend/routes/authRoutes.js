import express from 'express'
import { adminSignin, Signin, Signout, Signup, UpdateUser, getallUser, deleteUser, makeAdmin, getWishlist } from '../controllers/authController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);
router.post('/admin-signin', adminSignin);
router.get('/signout', Signout);
router.put("/edit-user", authMiddleware, UpdateUser);

router.get("/all-users",authMiddleware, isAdmin, getallUser);
router.delete("/delete-user/:id",authMiddleware, isAdmin, deleteUser);
router.put("/make-admin/:id",authMiddleware, isAdmin, makeAdmin);

router.get("/wishlist", authMiddleware, getWishlist);

export default router;