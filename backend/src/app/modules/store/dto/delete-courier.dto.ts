import { z } from 'zod';

export class DeleteCourierServiceDto {
  courierServiceIds: number[];
}

export const deleteCourierServiceSchema = z.object({
  courierServiceIds: z.array(z.number().positive().min(1)),
});
