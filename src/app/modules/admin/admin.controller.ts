import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { adminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await adminServices.blockUserFromDb(userId);
  if (result?.isBlocked) {
    sendResponse(res, {
      success: true,
      message: 'User blocked successfully',
      statusCode: httpStatus.OK,
    });
  }
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await adminServices.deleteBlogFromDb(id);

  sendResponse(res, {
    success: true,
    message: 'User deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
