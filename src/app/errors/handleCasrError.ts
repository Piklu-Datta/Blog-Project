import mongoose from 'mongoose';
import { TGenericError } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TGenericError => {
  const error = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation Error',
    error,
  };
};

export default handleCastError;
