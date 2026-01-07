import { z } from "zod";

const redirectParamSchema = z.object({
  params: z.object({
    shortCode: z
      .string("shortCode is required")
      .min(3, "Invalid short code")
      .max(20, "Invalid short code")
      .regex(/^[a-zA-Z0-9_-]+$/, "Invalid short code"),
  }),
});

const redirectValidations = {
    redirectParamSchema,
};

export default redirectValidations;