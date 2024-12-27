import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';

const adminAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const token = 'Bearer d2380c7969d512568c35dd3a40c6f9709797e4da0f879b7792e03828ac9dac11';
    const adminToken = req.headers.authorization;
    const adminVToken = adminToken?.split(' ')[1];
    const testToken =
      'd2380c7969d512568c35dd3a40c6f9709797e4da0f879b7792e03828ac9dac11';
    if (adminVToken !== testToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credential');
    }
    next();
  },
);

export default adminAuth;
