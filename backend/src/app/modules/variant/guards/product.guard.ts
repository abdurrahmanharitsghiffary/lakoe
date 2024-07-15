import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const id = request.body.productId;

    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: { store: { select: { userId: true } } },
    });

    if (!product) throw new NotFoundException('Product not found.');

    if (product.store.userId !== request.user.id) return false;
    return true;
  }
}
