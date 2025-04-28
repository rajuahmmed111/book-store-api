import express from 'express';
import { AuthorController } from './author.controller';
import validateRequest from '../../Middleware/validateRequest';
import { AuthorValidation } from './author.zod';

const router = express.Router();

// get all authors
router.get('/', AuthorController.getAllAuthorsFromDB);

// get single author by id
router.get('/:id', AuthorController.getSingleAuthorFromDB);

// create author
router.post('/', AuthorController.createAuthorIntoDB);

// update author by id
router.put(
  '/:id',
  validateRequest(AuthorValidation.updateAuthor),
  AuthorController.updateAuthorIntoDB,
);

// delete author by id
router.delete('/:id', AuthorController.deleteAuthorFromDB);

export const authorRoute = router;
