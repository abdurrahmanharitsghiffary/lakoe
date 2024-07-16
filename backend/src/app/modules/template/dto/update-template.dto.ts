import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateDto } from './create-template.dto';
import { z } from 'zod';

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}

export const updateTemplateMessageSchema = z.object({
  name: z.string().optional(),
  content: z.string().optional(),
});
