import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ActivationDto, activationSchema } from './app.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation/zod-validation.pipe';
import { z } from 'zod';
import { PrismaService } from '@/common/services/prisma.service';
import { User } from '@/common/decorators/user.decorator';
import { UserPayload } from '@/common/types';
import { ApiJwtBearerAuth } from '@/common/decorators/jwt-bearer.decorator';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiJwtBearerAuth()
  @Post('activation')
  @HttpCode(HttpStatus.OK)
  async activation(
    @User() user: UserPayload,
    @Body(new ZodValidationPipe(activationSchema)) body: ActivationDto,
    @Query('type', new ZodValidationPipe(z.enum(['product', 'sku'])))
    type: 'product' | 'sku',
  ) {
    const { ids, isActive } = body;
    let updatedCount = 0;

    if (ids.length > 0) {
      switch (type) {
        case 'product':
          {
            const updatedProducts = await this.prismaService.product.updateMany(
              {
                where: {
                  id: { in: ids },
                  AND: [{ store: { userId: user?.id } }],
                },
                data: { isActive },
              },
            );

            updatedCount = updatedProducts.count;
          }
          break;
        case 'sku':
          {
            const updatedVariants = await this.prismaService.sKU.updateMany({
              where: {
                id: { in: ids },
                AND: [{ product: { store: { userId: user?.id } } }],
              },
              data: { isActive },
            });

            updatedCount = updatedVariants.count;
          }
          break;
      }
    }

    return { count: updatedCount };
  }
}
