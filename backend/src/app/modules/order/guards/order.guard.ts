import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class OrderGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const order = await this.prismaService.order.findUnique({
      where: { id: request?.params?.id },
      select: { store: { select: { user: { select: { id: true } } } } },
    });
    console.log(order, 'ORDER');
    if (!order) throw new NotFoundException('Order is not found.');
    console.log(order, 'ORDER');
    if (request?.user?.id !== order?.store?.user?.id) return false;
    return true;
  }
}
