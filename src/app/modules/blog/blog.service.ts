import QueryBuilder from '../../builders/QueryBuilder';
import { searchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDb = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  await result.populate({
    path: 'author',
    select: 'name email',
  });
  //console.log(result);
  return result;
};

const updateBlogFromDb = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: 'author',
      select: 'name email',
    })
    .select('-isPublished -createdAt -updatedAt -__v');
  //console.log(result);
  return result;
};
const deleteBlogFromDb = async (id: string) => {
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
