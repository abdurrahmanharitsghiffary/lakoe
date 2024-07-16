import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class TemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  create(storeId: number, createTemplateDto: CreateTemplateDto) {
    return this.prismaService.messageTemplate.create({
      data: { ...createTemplateDto, storeId },
    });
  }

  findAllByStoreId(storeId: number) {
    return this.prismaService.messageTemplate.findMany({ where: { storeId } });
  }

  async findOne(id: number) {
    const template = await this.prismaService.messageTemplate.findUnique({
      where: { id },
    });
    if (!template) throw new NotFoundException('Message template not found.');
    return template;
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.prismaService.messageTemplate.update({
      where: { id },
      data: updateTemplateDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.messageTemplate.delete({ where: { id } });
  }
}
