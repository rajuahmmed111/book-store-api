import express from 'express';
import { BookController } from './book.controller';
import validateRequest from '../../Middleware/validateRequest';
import { BookValidation } from './book.zod';

const router = express.Router();

// get all books
router.get('/', BookController.getAllBooksFromDB);

// get single book
router.get('/:id', BookController.getSingleBookFromDB);

// create book
router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBookIntoDB,
);

// update book
router.put(
  '/:id',
  validateRequest(BookValidation.updateBook),
  BookController.updateBookIntoDB,
);

// delete book
router.delete('/:id', BookController.deleteBookFromDB);

export const bookRoute = router;
