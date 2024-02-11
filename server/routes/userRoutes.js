import express from 'express';
import { createUser, deleteCurrentUser, getAllUsers, getCurrentUser, updateCurrentUser, userLogin, userLogout } from '../controller/userController.js';

const router = express.Router();


router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').put(updateCurrentUser).delete(deleteCurrentUser).get(getCurrentUser);

router.route('/login').post(userLogin);
router.route('/logout').post(userLogout);

export default router;
