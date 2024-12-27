import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { RegisteredUser } from '../modules/User/user.model';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    const token = accessToken?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_excess_secret as string,
    ) as JwtPayload;

    const { userEmail } = decoded;
    const user = await RegisteredUser.isUserExistByEmail(userEmail);

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
