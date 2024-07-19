import { Prisma } from '@prisma/client';

export const selectTemplateMessage = {
  content: true,
  createdAt: true,
  id: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.MessageTemplateSelect;
