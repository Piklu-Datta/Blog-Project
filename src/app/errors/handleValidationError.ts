import mongoose from 'mongoose';
import { TError, TGenericError } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericError => {
  const error: TError = Object.values(err?.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    error,
  };
};

export default handleValidationError;
