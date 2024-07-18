import { Login, Register } from "@/types/auth-type";
import { z, ZodType } from "zod";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

export const registerSchema: ZodType<Register> = z.object({
  fullName: z.string().min(1, { message: "Name cannot be empty" }).max(50),
  username: z.string().min(1, { message: "Username cannot be empty" }).max(50),
  phone: z
    .string()
    .refine(
      isValidPhoneNumber,
      "Please specify a valid phone number (include the international prefix)."
    )
    .transform((value) => parsePhoneNumber(value).number.toString()),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password min length is 8 characters").max(30),
});

export const loginSchema: ZodType<Login> = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password min length is 8 characters").max(30),
});

export const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});
