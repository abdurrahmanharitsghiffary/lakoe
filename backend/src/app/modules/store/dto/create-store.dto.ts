import { z } from 'zod';
import { zfd } from 'zod-form-data';

export class CreateStoreDto {
  name: string;
  slogan: string;
  description: string;
}

export const createStoreSchema = zfd.formData(
  z.object({
    name: zfd.text(z.string().min(2)),
    slogan: zfd.text(z.string().min(2)),
    description: zfd.text(z.string().min(2)),
  }),
);
