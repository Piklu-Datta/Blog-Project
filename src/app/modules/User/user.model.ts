import { model, Schema } from 'mongoose';
import { TUserDocument, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/appError';

import httpStatus from 'http-status';
const userSchema = new Schema<TUserDocument, UserModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: [20, 'Password Atmost 20 character'],
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: '{VALUE} is not valid in role',
    },
    default: 'user',
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_sault_round),
  );
  next();
});

userSchema.pre('save', async function (next) {
  const isEmailExist = await RegisteredUser.findOne({
    email: this.email,
  });
  if (isEmailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'email already registered');
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByEmail = async (email: string) => {
  const result = await RegisteredUser.findOne({
    email,
  });
  return result;
};

userSchema.statics.isPasswordMatch = async (
  plainText: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainText, hashedPassword);
};

export const RegisteredUser = model<TUserDocument, UserModel>(
  'RegisteredUser',
  userSchema,
);
