import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addFavorite, deleteFavorite, getFavorites } from '../controllers/favorite-controller.js';

const router = express.Router();

router.get('/get-favorites', verifyToken, getFavorites)
router.post('/add-favorite/:id', verifyToken, addFavorite)
router.delete('/delete-favorite/:id', verifyToken, deleteFavorite)

export default router;