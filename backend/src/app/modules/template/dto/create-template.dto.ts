import { z } from 'zod';

export class CreateTemplateDto {
  name: string;
  content: string;
}

export const createTemplateMessageSchema = z.object({
  name: z.string(),
  content: z.string(),
});
