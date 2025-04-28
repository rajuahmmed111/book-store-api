import express from 'express';
import { AuthorController } from './author.controller';

const router = express.Router();

router.post('/', AuthorController.createAuthorIntoDB);

export const authorRoute = router;
