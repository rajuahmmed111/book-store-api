/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { Book, Prisma } from '@prisma/client';
import prisma from '../../../Shared/prisma';
import ApiError from '../../../Error/ApiErrors';
import { IFilterRequest } from './book.interface';
import { searchableFields } from './book.constant';

// create book
const createBookIntoDB = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: {
      ...payload,
      published_date: new Date(),
    },
    include: {
      author: true,
    },
  });

  return result;
};

// get all books (with query params) and  retrieve a list of book written by a specific author
const getAllBooksFromDB = async (
  params: IFilterRequest /**options:IPaginationOptions */,
): Promise<Book[]> => {
  const { searchTerm, ...filterData } = params;

  const filters: Prisma.BookWhereInput[] = [];

  // searching
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

  if (Object.keys(filterData).length > 0) {
    filters.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const where: Prisma.BookWhereInput = { AND: filters };

  const result = await prisma.book.findMany({
    where,
    include: {
      author: true,
    },
  });

  return result;
};

// get single book by id
const getSingleBookFromDB = async (id: number): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  return result;
};

// update book by id
const updateBookIntoDB = async (
  id: number,
  payload: Partial<Book>,
): Promise<Book> => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const result = await prisma.book.update({
    where: {
      id,
    },
    data: {
      ...payload,
      published_date: new Date(),
    },
  });

  return result;
};

// delete book by id
const deleteBookFromDB = async (id: number): Promise<void> => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  await prisma.book.delete({
    where: {
      id,
    },
  });
};

// retrieve a list of book written by a specific author
// const getBooksByAuthor = async (authorId: number): Promise<Book[]> => {

// }

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
