import express from 'express'
import { adminSignin, Signin, Signout, Signup, UpdateUser, getallUser, deleteUser, makeAdmin, getWishlist } from '../controllers/authController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { emptyCart, getUserCart, removeProductFromCart, updateProductQuantityFromCart, userCart } from '../controllers/cartController.js';

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

//Cart Routes

router.post("/cart", authMiddleware, userCart);
router.get("/get-cart", authMiddleware, getUserCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.delete("/empty-cart", authMiddleware, emptyCart);

export default router;