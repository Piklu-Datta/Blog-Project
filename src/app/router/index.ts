import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { adminRoutes } from '../modules/admin/admin.route';

const router = Router();

const multiRouter = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
];

multiRouter.forEach((route) => router.use(route.path, route.route));

export default router;
