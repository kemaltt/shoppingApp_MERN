import express from 'express';
import { login, logout, register, updateUser } from '../controllers/user-controller.js';
import { verifyToken } from '../middleware/auth.js';



const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.put('/update/:id', verifyToken, updateUser)
router.get('/logout', logout)


export default router;