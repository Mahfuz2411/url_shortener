import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validateRequest =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const firstErrorMessage =
        result.error.issues[0]?.message || 'Validation error';

      return res.status(400).json({
        success: false,
        message: firstErrorMessage,
        errors: result.error.format(),
      });
    }

    // Apply Zod transforms back to req so controllers get cleaned data
    if (result.data.body !== undefined) req.body = result.data.body;
    if (result.data.params !== undefined) req.params = result.data.params;
    if (result.data.query !== undefined) req.query = result.data.query;

    next();
  };

export default validateRequest;
