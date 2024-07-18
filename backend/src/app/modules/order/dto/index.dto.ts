import { z } from 'zod';

export class FindAllOptions {
  couriers?: string;
  status?: string;
  q?: string;
  sort_by?: 'oldest' | 'latest';
}

export const findAllOptionsSchema = z.object({
  couriers: z.string().optional(),
  status: z
    .enum([
      'NOT_PAID',
      'NEW_ORDER',
      'READY_TO_DELIVER',
      'ON_DELIVERY',
      'SUCCESS',
      'CANCELLED',
    ])
    .optional(),
  q: z.string().optional(),
  sort_by: z.enum(['oldest', 'latest']).optional(),
});
