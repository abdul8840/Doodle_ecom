import express from 'express'
import { adminSignin, Signin, Signout, Signup, UpdateUser, getallUser, deleteUser, makeAdmin, getWishlist } from '../controllers/authController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { emptyCart, getUserCart, removeProductFromCart, updateProductQuantityFromCart, userCart } from '../controllers/cartController.js';
import { createOrder, getAllOrders, getMonthWiseOrderIncome, getMyOrders, getsingleOrder, getYearlyTotalOrder, updateOrder } from '../controllers/orderController.js';
import { checkout, paymentVerification } from '../controllers/paymentController.js';

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

// Checkout and payment Routes

router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);

//order Routes

router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaOrder/:id", authMiddleware, isAdmin, getsingleOrder);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getyearlyorders", authMiddleware, getYearlyTotalOrder);

export default router;