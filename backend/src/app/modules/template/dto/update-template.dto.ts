import { PartialType } from '@nestjs/swagger';
import { CreateTemplateDto } from './create-template.dto';
import { z } from 'zod';

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}

export const updateTemplateMessageSchema = z.object({
  name: z.string().optional(),
  content: z.string().optional(),
});
