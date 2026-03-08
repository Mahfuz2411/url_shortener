import { Request, Response, NextFunction } from 'express'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  // Custom error messages
  if (err.message === 'EMAIL_ALREADY_EXISTS') {
    statusCode = 409;
    message = 'An account with this email already exists';
  } else if (err.message === 'INVALID_CREDENTIALS') {
    statusCode = 401;
    message = 'Invalid email or password';
  } else if (err.message === 'EMAIL_NOT_VERIFIED') {
    statusCode = 403;
    message = 'Please verify your email before logging in. Check your inbox for the verification link.';
  } else if (err.message === 'USER_NOT_FOUND') {
    statusCode = 404;
    message = 'User not found';
  } else if (err.message === 'INVALID_OR_EXPIRED_TOKEN') {
    statusCode = 400;
    message = 'Invalid or expired verification link. Please request a new one.';
  } else if (err.message === 'EMAIL_ALREADY_VERIFIED') {
    statusCode = 400;
    message = 'Your email is already verified. You can login now.';
  }
  // Duplicate key error
  else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }
  // Mongoose validation error
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((el: any) => el.message)
      .join(', ');
  }
  // Zod validation error
  else if (err.name === 'ZodError') {
    statusCode = 400;
    message = err.issues?.map((issue: any) => issue.message).join(', ') || 'Validation error';
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler