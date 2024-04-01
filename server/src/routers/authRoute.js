import express from 'express';
import { getWishlist, login, logout, register, updateUser } from '../controllers/UserController.js';
import { verifyToken } from '../middleware/auth.js';



const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.put('/update/:id', verifyToken, updateUser)
router.get('/logout', logout)
router.get('/wishlist', verifyToken, getWishlist)

export default router;