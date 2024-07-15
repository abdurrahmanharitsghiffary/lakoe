import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const IsGuardProduct = this.reflector.getAllAndOverride(
      'is-guard-product',
      [context.getHandler(), context.getClass()],
    );

    if (!IsGuardProduct) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const id = Number(request.params?.id) || -1;
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: { store: { select: { user: { select: { id: true } } } } },
    });
    const userId = (request as any).user.id;

    if (userId !== product.store.user.id) return false;
    return true;
  }
}
