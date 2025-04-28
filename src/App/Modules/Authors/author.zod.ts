import { z } from 'zod';

const createAuthor = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    bio: z.string().optional(),
    birthdate: z.string({}).datetime().optional(),
  }),
});

const updateAuthor = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    bio: z.string().optional(),
    birthdate: z.date().optional(),
  }),
});

export const AuthorValidation = {
  createAuthor,
  updateAuthor,
};
