import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '@/common/services/prisma.service';

@Injectable()
export class TemplateGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const id = Number(request.params?.id) || -1;
    const product = await this.prismaService.messageTemplate.findUnique({
      where: { id },
      select: { store: { select: { userId: true } } },
    });

    if (!product) throw new NotFoundException('Template message not found.');

    if (request?.user?.id !== product.store.userId) return false;
    return true;
  }
}
