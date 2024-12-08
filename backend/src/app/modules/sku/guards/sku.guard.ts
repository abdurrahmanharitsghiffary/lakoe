import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '@/common/services/prisma.service';

@Injectable()
export class SkuGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const id = Number(request.params?.id) || -1;
    const sKU = await this.prismaService.sKU.findUnique({
      where: { id },
      select: { product: { select: { store: { select: { userId: true } } } } },
    });

    if (!sKU) throw new NotFoundException('Product sku is not found.');

    if (request?.user?.id !== sKU?.product?.store?.userId) return false;
    return true;
  }
}
