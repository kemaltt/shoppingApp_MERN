import express from 'express';
import { getCategory, getAllProducts, getSingleProduct, updateProductById } from '../controllers/product-controller.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

// router.get('/products', getAllProducts);
router.get('/product/:id', verifyToken, getSingleProduct);
router.get(`/products`, getCategory);
router.patch(`/product/:id`, verifyToken, updateProductById);


export default router;