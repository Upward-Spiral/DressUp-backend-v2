// src/middleware/error.middleware.ts

import HttpException from '../common/http-exception'
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction
) => {
  const status = error.statusCode || error.status || 500

  response.status(status).send(error)
}