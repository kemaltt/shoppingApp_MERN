import express from 'express';
import { forgotPassword, login, logout, register, resetPassword, updateUser, verifyAccount } from '../controllers/auth-controller.js';
import { verifyToken } from '../middleware/auth.js';



const router = express.Router();

router.post('/register', register);
router.get('/verify-account', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:reset_password_key', resetPassword)
router.put('/update-user', verifyToken, updateUser)
router.get('/logout', logout)


export default router;