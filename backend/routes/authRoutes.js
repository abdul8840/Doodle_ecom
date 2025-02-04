import express from 'express'
import { adminSignin, Signin, Signout, Signup, UpdateUser, getallUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);
router.post('/admin-signin', adminSignin);
router.get('/signout', Signout);
router.put("/edit-user", authMiddleware, UpdateUser);

router.get("/all-users", getallUser);

export default router;