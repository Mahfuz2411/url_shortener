import { z } from "zod";

const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url("Invalid URL format"),
});

export default createUrlSchema;