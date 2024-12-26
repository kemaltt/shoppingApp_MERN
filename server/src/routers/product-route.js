import express from 'express';
import { getCategory, getAllProducts, getSingleProduct, updateProductById, createProduct, deleteProduct, editProduct } from '../controllers/product-controller.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

// router.get('/products', getAllProducts);
router.get('/product/:id', verifyToken, getSingleProduct);
router.get(`/products`, getCategory);
router.patch(`/product/:id`, verifyToken, updateProductById);
router.put(`/edit-product/:id`, verifyToken, editProduct);
// router.post(`/add-product`, FileUploadService.upload, createProduct);
router.post(`/add-product`, createProduct);
router.delete(`/delete-product/:id`, verifyToken, deleteProduct);
// router.post(`/upload-images`, FileUploadService.upload);


export default router;