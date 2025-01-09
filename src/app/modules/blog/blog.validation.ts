import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(30)
      .regex(
        /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
        'Each word in the title must start with a capital letter',
      ),
    content: z.string({
      required_error: 'content is required',
    }),

    isPublished: z.boolean().default(false),
  }),
});
const updatedValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(30)
      .regex(
        /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
        'Each word in the title must start with a capital letter',
      )
      .optional(),
    content: z
      .string({
        required_error: 'content is required',
      })
      .optional(),

    isPublished: z.boolean().default(false),
  }),
});

export const blogValidation = {
  blogValidationSchema,
  updatedValidationSchema,
};
