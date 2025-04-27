import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import cors from 'cors';
import GlobalErrorHandler from './App/Middleware/globalErrorHandler';
import router from './App/Routes';

const app: Application = express();

export const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route handler for the root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Welcome to the API!',
  });
});

// Setup API routes
app.use('/api/v1',router);

// Error handling middleware
app.use(GlobalErrorHandler);

// 404 Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND!',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  });
});

export default app;
