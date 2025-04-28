import { z } from 'zod';

const updateAuthor = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    bio: z.string().optional(),
    birthdate: z.date().optional(),
  }),
});

export const AuthorValidation = {
  updateAuthor,
};
