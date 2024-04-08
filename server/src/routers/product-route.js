import express from 'express';
import { getCategory, getAllProducts, getSingleProduct } from '../controllers/product-controller.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

// router.get('/products', getAllProducts);
router.get('/product/:id', verifyToken, getSingleProduct);
router.get(`/products`, getCategory);


export default router;