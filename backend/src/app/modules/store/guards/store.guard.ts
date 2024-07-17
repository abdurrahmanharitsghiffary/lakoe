import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { StoreService } from '../store.service';

@Injectable()
export class StoreGuard implements CanActivate {
  constructor(private readonly storeService: StoreService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const id = Number(request.params.id) || -1;

    const store = await this.storeService.findOne(id);

    if (!store) throw new NotFoundException('Store not found.');

    if (store?.user?.id !== request?.user?.id) return false;
    return true;
  }
}
