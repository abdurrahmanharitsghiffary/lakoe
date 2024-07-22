import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CourierDto {
  courierCode: string;
  courierServiceCode: string;
  courierServiceName: string;
}

export class AddCourierDto {
  @ApiProperty({ type: () => [CourierDto] })
  courierServices: CourierDto[];
}

const courierDto = z.object({
  courierCode: z.string(),
  courierServiceCode: z.string(),
  courierServiceName: z.string(),
});

export const addCourierDto = z.object({
  courierServices: z.array(courierDto).min(1),
});
