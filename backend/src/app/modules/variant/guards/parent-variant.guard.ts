import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ParentVariantGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const id = request.body?.parentId;

    if (!id) return true;

    const variant = await this.prismaService.variant.findUnique({
      where: { id },
      select: { product: { select: { store: { select: { userId: true } } } } },
    });

    if (!variant) throw new NotFoundException('Parent variant not found.');

    if (variant.product.store.userId !== request.user.id) return false;
    return true;
  }
}
