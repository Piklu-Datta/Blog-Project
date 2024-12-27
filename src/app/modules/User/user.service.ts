import { TUserDocument } from './user.interface';
import { RegisteredUser } from './user.model';

const registerUserIntoDb = async (payload: TUserDocument) => {
  const result = await RegisteredUser.create(payload);
  return result;
};

const getRegisteredUser = async () => {
  const result = await RegisteredUser.find();
  return result;
};

export const UserServices = {
  registerUserIntoDb,
  getRegisteredUser,
};
