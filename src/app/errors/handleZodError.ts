import { ZodError, ZodIssue } from 'zod';
import { TError, TGenericError } from '../interface/error';
const handleZodError = (err: ZodError): TGenericError => {
  const error: TError = err?.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    error,
  };
};

export default handleZodError;
