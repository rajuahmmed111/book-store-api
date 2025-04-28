import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string().optional(),
    published_date: z
      .string({
        required_error: 'Published date is required',
      })
      .datetime()
      .optional(),
    authorId: z.number({
      required_error: 'Author ID is required',
    }),
  }),
});

const updateBook = z.object({
  body: z.object({
    title: z.string().min(1, 'title is required').optional(),
    description: z.string().optional(),
    published_date: z.date().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBook,
};
