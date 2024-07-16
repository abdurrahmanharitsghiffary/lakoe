import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const Z = {
  phone: z
    .string()
    .refine(
      isValidPhoneNumber,
      'Please specify a valid phone number (include the international prefix).',
    )
    .transform((value) => parsePhoneNumber(value).number.toString()),
} as const;
