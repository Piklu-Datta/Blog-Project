import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import auth from '../../middleWare/auth';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.createBlog,
);
router.patch(
  '/:id',
  auth(),
  validateRequest(blogValidation.updatedValidationSchema),
  blogController.updateBlog,
);
router.get('/', auth(), blogController.getAllBlogs);
router.delete('/:id', auth(), blogController.deleteBlog);

export const blogRoutes = router;
