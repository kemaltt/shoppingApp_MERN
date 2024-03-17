import express from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/ProductController.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', verifyToken, getSingleProduct);


export default router;