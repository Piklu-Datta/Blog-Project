import express from 'express';

import { adminController } from './admin.controller';
import auth from '../../middleWare/auth';

const router = express.Router();

router.patch('/users/:userId/block', auth(), adminController.blockUser);
router.delete('/blogs/:id', auth(), adminController.deleteBlog);

export const adminRoutes = router;
