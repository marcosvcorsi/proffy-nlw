/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import ServerError from '../errors/ServerError';

export default async (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (err instanceof ServerError) {
    const { statusCode, message } = err;

    return response.status(statusCode).json({
      status: 'error',
      message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
