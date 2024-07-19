import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  slogan: z.string().min(1, "Slogan cannot be empty"),
  logo: z.instanceof(FileList).nullable().optional(),
  banner: z.instanceof(FileList).nullable().optional(),
});
