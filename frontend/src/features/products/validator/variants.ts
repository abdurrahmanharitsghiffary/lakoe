import { z } from "zod";

export const variantSchema = z.object({
  weightInGram: z.number().min(10),
  stock: z.number().min(1),
  price: z.number().min(1),
  isActive: z.boolean(),
  name: z.string().min(1),
});

export type VariantSchema = z.infer<typeof variantSchema>;
