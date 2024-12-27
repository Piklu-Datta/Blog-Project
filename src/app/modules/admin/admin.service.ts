import { Blog } from '../blog/blog.model';
import { RegisteredUser } from '../User/user.model';

const blockUserFromDb = async (id: string) => {
  const result = await RegisteredUser.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const deleteBlogFromDb = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const adminServices = {
  blockUserFromDb,
  deleteBlogFromDb,
};
