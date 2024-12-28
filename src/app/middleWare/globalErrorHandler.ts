/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TError } from '../interface/error';
import AppError from '../errors/appError';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCasrError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 400;
  let message = 'something went wrong';

  let error: TError = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err);
    (statusCode = simpliFiedError?.statusCode),
      (message = simpliFiedError?.message),
      (error = simpliFiedError?.error);
  } else if (err.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(err);
    (statusCode = simpliFiedError?.statusCode),
      (message = simpliFiedError?.message),
      (error = simpliFiedError?.error);
  } else if (err?.name === 'CastError') {
    const simpliFiedError = handleCastError(err);
    (statusCode = simpliFiedError?.statusCode),
      (message = simpliFiedError?.message),
      (error = simpliFiedError?.error);
  }
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
