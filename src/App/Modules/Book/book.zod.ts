import { z } from 'zod';

const updateBook = z.object({
  body: z.object({
    title: z.string().min(1, 'title is required').optional(),
    description: z.string().optional(),
    published_date: z.date().optional(),
  }),
});

export const BookValidation = {
  updateBook,
};
