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
    const id = Number(request.params?.id) || -1;
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: { store: { select: { user: { select: { id: true } } } } },
    });

    if (!product) throw new NotFoundException('Product not found.');

    if (request?.user?.id !== product.store.user.id) return false;
    return true;
  }
}
