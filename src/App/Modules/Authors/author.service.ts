import httpStatus from 'http-status';
import { Author, Prisma } from '@prisma/client';
import prisma from '../../../Shared/prisma';
import ApiError from '../../../Error/ApiErrors';
import {
  IFilterRequest,
  IPaginationOptions,
  IPaginationResult,
} from './author.interface';
import { calculatedPagination } from '../../../Helpers/calculatePagination';
import { searchableFields } from './author.constant';

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
const getAllAuthorsFromDB = async (
  params: IFilterRequest,
  options: IPaginationOptions,
): Promise<IPaginationResult<Author[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatedPagination(options);

  const filters: Prisma.AuthorWhereInput[] = [];

  // searching (text fields only)
  if (params?.searchTerm) {
    filters.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const result = await prisma.author.findMany({
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      books: true,
    },
  });

  return {
    meta: {
      page,
      limit,
    },
    data: result,
  };
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
