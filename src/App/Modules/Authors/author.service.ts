import httpStatus from 'http-status';
import { Author } from '@prisma/client';
import prisma from '../../../Shared/prisma';
import ApiError from '../../../Error/ApiErrors';

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

// get all authors
const getAllAuthorsFromDB = async (): Promise<Author[]> => {
  const result = await prisma.author.findMany({
    include: {
      books: true,
    },
  });

  return result;
};

// get single author by id
const getSingleAuthorFromDB = async (id: number): Promise<Author | null> => {
  const result = await prisma.author.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
  }

  return result;
};

// update author by id
const updateAuthorIntoDB = async (
  id: number,
  payload: Partial<Author>,
): Promise<Author> => {
  const author = await prisma.author.findUnique({
    where: {
      id,
    },
  });
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
  }
  const result = await prisma.author.update({
    where: {
      id,
    },
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

// delete author by id
const deleteAuthorFromDB = async (id: number): Promise<void> => {
  const author = await prisma.author.findUnique({
    where: {
      id,
    },
  });
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
  }

  prisma.author.delete({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
};

export const AuthorService = {
  createAuthorIntoDB,
  getAllAuthorsFromDB,
  getSingleAuthorFromDB,
  updateAuthorIntoDB,
  deleteAuthorFromDB,
};
