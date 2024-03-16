import express from 'express';
import { addToCart, getCart } from '../controllers/CartController.js';

const router = express.Router();

router.get('/cart', getCart);
router.post('/add-to-cart', addToCart);

export default router;