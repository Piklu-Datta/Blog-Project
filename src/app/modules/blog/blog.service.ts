import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/appError';
import { searchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status';
const createBlogIntoDb = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  await result.populate({
    path: 'author',
    select: 'name email',
  });

  return result;
};

const updateBlogFromDb = async (
  id: string,
  isUserId: string,
  payload: Partial<TBlog>,
) => {
  const blog = await Blog.findById(id).select('author');

  if (!blog) {
    throw new Error('Blog not found');
  }

  if (blog.author.toString() !== isUserId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You can not update the blog');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: 'author',
      select: 'name email',
    })
    .select('-isPublished -createdAt -updatedAt -__v');
  return result;
};
const deleteBlogFromDb = async (id: string, isUserId: string) => {
  const blog = await Blog.findById(id).select('author');

  if (!blog) {
    throw new Error('Blog not found');
  }

  if (blog.author.toString() !== isUserId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You can not delete the blog');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogsFromDb = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .sort();
  const result = await blogQuery.modelQuery;
  return result;
};

export const blogServices = {
  createBlogIntoDb,
  updateBlogFromDb,
  deleteBlogFromDb,
  getAllBlogsFromDb,
};
