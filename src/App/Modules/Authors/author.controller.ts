import httpStatus  from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { AuthorService } from './author.service';

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

export const AuthorController = {
    createAuthorIntoDB,
}
