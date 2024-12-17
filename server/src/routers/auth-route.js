import express from 'express';
import { forgotPassword, login, logout, register, resetPassword, updateUser } from '../controllers/auth-controller.js';
import { verifyToken } from '../middleware/auth.js';



const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:reset_password_key', resetPassword)
router.put('/update/:id', verifyToken, updateUser)
router.get('/logout', logout)


export default router;