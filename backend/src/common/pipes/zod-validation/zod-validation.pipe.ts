import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly zodSchema: ZodSchema) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const parsed = await this.zodSchema.parseAsync(value);
    return parsed;
  }
}
