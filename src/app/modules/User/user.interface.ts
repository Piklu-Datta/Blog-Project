import { Model, Types } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
export interface TUserDocument extends TUser, Document {
  _id: Types.ObjectId; // Explicitly include `_id`
}

export interface UserModel extends Model<TUserDocument> {
  isUserExistByEmail(email: string): Promise<TUserDocument>;
  isPasswordMatch(plainText: string, hashedPassword: string): Promise<boolean>;
}
