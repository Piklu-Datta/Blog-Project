import config from '../../config';
import AppError from '../../errors/appError';
import { RegisteredUser } from '../User/user.model';
import { TLogin } from './auth.interface';
import httpStatus from 'http-status';
import Create from './auth.utils';

const loginUser = async (payload: TLogin) => {
  const user = await RegisteredUser.isUserExistByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credential');
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credential');
  }
  if (
    !(await RegisteredUser.isPasswordMatch(payload?.password, user?.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credential');
  }
  const jwtPayload = {
    userId: user._id,
    userEmail: user?.email,
  };
  const accessToken = Create(
    jwtPayload,
    config.jwt_excess_secret as string,
    config.jwt_excess_expireiIn as string,
  );
  return {
    accessToken,
  };
};

export const authServices = {
  loginUser,
};
