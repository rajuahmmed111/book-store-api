import httpStatus from 'http-status';
import { Book } from '@prisma/client';
import prisma from '../../../Shared/prisma';
import ApiError from '../../../Error/ApiErrors';

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

// get all books
const getAllBooksFromDB = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
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

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
