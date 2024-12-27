import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controler';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const authRoutes = router;
