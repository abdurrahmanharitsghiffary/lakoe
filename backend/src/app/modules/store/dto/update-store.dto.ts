import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}

export const updateStoreSchema = zfd.formData(
  z.object({
    name: zfd.text(z.string().min(2).optional()),
    slogan: zfd.text(z.string().min(2).optional()),
    description: zfd.text(z.string().min(2).optional()),
  }),
);
