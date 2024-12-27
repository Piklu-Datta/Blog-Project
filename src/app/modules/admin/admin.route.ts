import express from 'express';
import adminAuth from '../../middleWare/adminAuth';
import { adminController } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', adminAuth, adminController.blockUser);
router.delete('/blogs/:id', adminAuth, adminController.deleteBlog);

export const adminRoutes = router;
