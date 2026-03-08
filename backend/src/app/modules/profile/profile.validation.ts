import { z } from 'zod';

export const createProfileValidationSchema = z.object({
  body: z.object({
    gender: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val === '') return undefined;
        if (!['Male', 'Female', 'Other'].includes(val)) {
          throw new Error('Gender must be Male, Female, or Other');
        }
        return val;
      }),
    country: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    contactNumber: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    bio: z
      .string()
      .max(200, 'Bio must not exceed 200 characters')
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
  }),
});

export const updateProfileValidationSchema = z.object({
  body: z.object({
    gender: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val === '') return undefined;
        if (!['Male', 'Female', 'Other'].includes(val)) {
          throw new Error('Gender must be Male, Female, or Other');
        }
        return val;
      }),
    country: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    contactNumber: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    bio: z
      .string()
      .max(200, 'Bio must not exceed 200 characters')
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
  }),
});
