import { z } from "zod";

const createUrlSchema = z.object({
  body: z.object({
    originalUrl: z
      .string()
      .url("Invalid URL format"),
    customCode: z
      .string()
      .min(3, "Custom code must be at least 3 characters")
      .max(30, "Custom code must be at most 30 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Custom code can only contain letters, numbers, hyphens, and underscores")
      .optional(),
  }),
});

const deleteUrlSchema = z.object({
  body: z.object({
    urlId: z.string( "urlId is required" ),
  }),
});

const zodValidations = {
  createUrlSchema,
  deleteUrlSchema
}

export default zodValidations;