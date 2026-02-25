import { Request, Response, NextFunction } from 'express'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 409
    const field = Object.keys(err.keyValue)[0]
    message = `${field} already exists`
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((el: any) => el.message)
      .join(', ')
  }

  res.status(statusCode).json({
    success: false,
    message,
  })
}

export default globalErrorHandler