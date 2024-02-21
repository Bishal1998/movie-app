import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import { favMovie, getFav } from '../controller/favController.js';

const router = express.Router();

router.route('/:movieId').put(authenticate, favMovie);
router.route("/:userId").get(authenticate, getFav);
export default router;