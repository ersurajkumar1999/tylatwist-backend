
import express from 'express';
import { auth } from '../middlewares/authMiddleware.js';

import { create, postLike, postList, postUnLike } from "../controllers/PostController.js"

const router = express.Router();


// Start  Admin & Manager Role
router.post('/list', postList);
router.post('/store',auth, create);
router.post('/show/:id', postList);
router.post('/update/:id', postList);
router.post('/destroy/:id', postList);

// Post Handel
router.put('/like', auth, postLike);
router.put('/unlike', auth, postUnLike);


export default router;