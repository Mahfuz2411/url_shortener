import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestSchema = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

const validateRequest =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      // v5 compatible error formatting
      const formattedErrors = result.error.format();
      return res.status(400).json({
        success: false,
        errors: formattedErrors,
      });
    }

    next();
  };

export default validateRequest;
