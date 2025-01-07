import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { accessToken } = result;

  sendResponse(res, {
    success: true,
    message: 'Login successfully',
    statusCode: httpStatus.OK,
    data: {
      token: accessToken,
    },
  });
});

export const authController = {
  loginUser,
};
