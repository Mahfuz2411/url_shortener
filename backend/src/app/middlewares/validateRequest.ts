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

    next();
  };

export default validateRequest;
