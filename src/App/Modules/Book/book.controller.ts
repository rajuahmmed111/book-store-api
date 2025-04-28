import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { BookService } from './book.service';
import { pick } from '../../../Shared/pick';
import { filterField, paginationField } from './book.constant';

// create book
const createBookIntoDB = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await BookService.createBookIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

// get all books (with query params)
const getAllBooksFromDB = catchAsync(async (req, res) => {
  const filter = pick(req.query, filterField);
  const options = pick(req.query, paginationField);

  const result = await BookService.getAllBooksFromDB(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

// get single book
const getSingleBookFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookService.getSingleBookFromDB(+id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

// update book
const updateBookIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await BookService.updateBookIntoDB(+id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

// delete book
const deleteBookFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookService.deleteBookFromDB(+id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
