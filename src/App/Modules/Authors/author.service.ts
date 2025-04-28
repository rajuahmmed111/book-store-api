import { Author } from '@prisma/client';
import prisma from '../../../Shared/prisma';

const createAuthorIntoDB = async (payload: Author): Promise<Author> => {
  const result = await prisma.author.create({
    data: {
      ...payload,
      birthdate: new Date(),
    },
    include: {
      books: true,
    },
  });

  return result;
};

export const AuthorService = {
  createAuthorIntoDB,
};
