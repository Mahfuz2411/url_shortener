import { z } from "zod";

const createUrlSchema = z.object({
  body: z.object({
    originalUrl: z
      .string()
      .url("Invalid URL format"),
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