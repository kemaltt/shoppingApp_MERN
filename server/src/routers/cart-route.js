import express from 'express';
import { addToCart, getCart, removeFromCart, updateCartById } from '../controllers/cart-controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/cart', verifyToken, getCart);
router.post('/add-to-cart', verifyToken, addToCart);
router.delete('/delete-from-cart/:id', verifyToken, removeFromCart);
router.patch('/update-cart/:id', verifyToken, updateCartById);

export default router;