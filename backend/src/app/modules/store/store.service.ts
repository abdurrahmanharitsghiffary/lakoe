import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { selectStore, selectStoreSimplified } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: number,
    createStoreDto: CreateStoreDto & {
      bannerAttachment?: string;
      logoAttachment?: string;
    },
  ) {
    const store = await this.prismaService.store.count({ where: { userId } });
    if (store > 0) throw new ConflictException('Store already created.');

    return this.prismaService.store.create({
      data: {
        userId,
        domain: `${createStoreDto.name.replaceAll(' ', '-').toLowerCase()}-${Date.now().toString().slice(-3)}`,
        ...createStoreDto,
      },
    });
  }

  findAll() {
    return this.prismaService.store.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: selectStoreSimplified,
    });
  }

  async findOne(id: number) {
    const store = await this.prismaService.store.findUnique({
      where: { id },
      select: selectStore,
    });
    if (!store) throw new NotFoundException('Store not found.');
    return store;
  }

  async findOneByUserId(id: number) {
    const store = await this.prismaService.store.findUnique({
      where: { userId: id },
      select: selectStore,
    });
    if (!store) throw new NotFoundException('Store not found.');
    return store;
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto & {
      logoAttachment?: string;
      bannerAttachment?: string;
    },
  ) {
    await this.findOne(id);
    return this.prismaService.store.update({
      data: updateStoreDto,
      where: { id },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.store.delete({ where: { id } });
  }
}
