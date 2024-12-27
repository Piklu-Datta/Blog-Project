import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      minlength: [5, 'At least 5 latter'],
    },
    content: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'RegisteredUser',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const Blog = model<TBlog>('Blog', blogSchema);
