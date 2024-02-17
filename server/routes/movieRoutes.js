import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import { createMovie, deleteMovie, getAllMovie, getSingleMovie, updateMovie } from '../controller/movieController.js';

const router = express.Router();

router.route('/').post(authenticate, authorizeAdmin, createMovie).get(getAllMovie);
router.route('/:id').put(authenticate, authorizeAdmin, updateMovie).delete(authenticate, authorizeAdmin, deleteMovie).get(getSingleMovie);

export default router;