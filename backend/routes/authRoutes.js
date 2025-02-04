import express from 'express'
import { Signin, Signout, Signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);
router.get('/signout', Signout);

export default router;