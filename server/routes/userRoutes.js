import express from 'express';
import { createUser, deleteCurrentUser, getAllUsers, getCurrentUser, updateCurrentUser, userLogin, userLogout } from '../controller/userController.js';

import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.route('/:id').put(updateCurrentUser).delete(deleteCurrentUser).get(getCurrentUser);

router.route('/login').post(userLogin);
router.route('/logout').post(userLogout);

export default router;
