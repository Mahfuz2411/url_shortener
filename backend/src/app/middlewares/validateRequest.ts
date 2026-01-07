import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';


const validateRequest =
  (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse({
        body: req?.body,
        params: req?.params,
        query: req?.query,
      });
      // console.log(req.body);
      // console.log(result);
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
