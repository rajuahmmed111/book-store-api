import httpStatus  from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { AuthorService } from './author.service';
import { pick } from '../../../Shared/pick';
import { filterField, paginationField } from './author.constant';

// create author into DB
const createAuthorIntoDB = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await AuthorService.createAuthorIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Author created successfully',
    data: result,
  });
});

// get all authors
const getAllAuthorsFromDB = catchAsync(async (req, res) => {
  const filter = pick(req.query, filterField);
    const options = pick(req.query, paginationField);
  const result = await AuthorService.getAllAuthorsFromDB(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Authors retrieved successfully',
    data: result,
  });
});

// get single author by id
const getSingleAuthorFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AuthorService.getSingleAuthorFromDB(+id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author retrieved successfully',
    data: result,
  });
});

//  update author by id
const updateAuthorIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await AuthorService.updateAuthorIntoDB(+id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author updated successfully',
    data: result,
  });
});

// delete author by id
const deleteAuthorFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AuthorService.deleteAuthorFromDB(+id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author deleted successfully',
    data: result,
  });
});

// 

export const AuthorController = {
    createAuthorIntoDB,
    getAllAuthorsFromDB,
    getSingleAuthorFromDB,
    updateAuthorIntoDB,
    deleteAuthorFromDB,
}
