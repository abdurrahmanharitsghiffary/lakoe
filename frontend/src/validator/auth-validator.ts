import { Login, Register } from "@/types/auth-type";
import { z, ZodType } from "zod";

const MAX_FILE_SIZE = 5000000; // 5mb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const registerSchema: ZodType<Register> = z.object({
  fullName: z.string().min(1, { message: "Name cannot be empty" }).max(50),
  username: z.string().min(1, { message: "Username cannot be empty" }).max(50),
  phone: z.string().min(1, { message: "Phone cannot be empty" }).max(30),
  profilePicture: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password min length is 8 characters").max(30),
});

export const loginSchema: ZodType<Login> = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password min length is 8 characters").max(30),
});
