import express from 'express'
import { Signin, Signout, Signup, UpdateUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);
router.get('/signout', Signout);
router.put("/edit-user", authMiddleware, UpdateUser);

export default router;