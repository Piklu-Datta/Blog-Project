import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1)
      .max(20)
      .regex(
        /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
        'Each word in the name must start with a capital letter',
      ),
    email: z.string().email(),
    password: z.string().max(20),
    role: z.enum(['admin', 'user']).optional().default('user'),
    isBlocked: z.boolean().optional().default(false),
  }),
});

export const userValidation = {
  registerValidationSchema,
};
