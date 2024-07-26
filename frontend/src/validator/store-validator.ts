import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters or more."),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters or more."),
  slogan: z.string().min(2, "Slogan must be at least 2 characters or more."),
  logo: z.any().nullable().optional(),
  banner: z.any().nullable().optional(),
});

export type StoreSchema = z.infer<typeof storeSchema>;

export const updateStoreSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters or more.")
    .optional(),
  slogan: z
    .string()
    .min(2, "Description must be at least 2 characters or more.")
    .optional(),
  description: z
    .string()
    .min(2, "Slogan must be at least 2 characters or more.")
    .optional(),
  logo: z.any().nullable().optional(),
  banner: z.any().nullable().optional(),
});

export type UpdateStoreSchema = z.infer<typeof updateStoreSchema>;
