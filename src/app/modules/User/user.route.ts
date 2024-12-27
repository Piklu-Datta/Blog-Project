import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.registerValidationSchema),
  userController.registerUser,
);
router.get('/', userController.getAllUser);

export const userRoutes = router;
