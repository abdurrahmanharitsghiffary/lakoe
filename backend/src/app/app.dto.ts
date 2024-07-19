import { z } from 'zod';

export class ActivationDto {
  ids: number[];
  isActive: boolean;
}

export const activationSchema = z.object({
  ids: z.array(z.number()).max(10),
  isActive: z.boolean(),
});
