import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDb(req.body);

  sendResponse(res, {
    success: true,
    message: 'user registered successfully',
    statusCode: 201,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getRegisteredUser();

  sendResponse(res, {
    success: true,
    message: 'user retrieve successfully',
    statusCode: 201,
    data: result,
  });
});

export const userController = {
  registerUser,
  getAllUser,
};
