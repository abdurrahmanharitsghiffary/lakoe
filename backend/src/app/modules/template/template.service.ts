import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { selectTemplateMessage } from 'src/common/query/message-template.select';

@Injectable()
export class TemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  create(storeId: number, createTemplateDto: CreateTemplateDto) {
    return this.prismaService.messageTemplate.create({
      data: { ...createTemplateDto, storeId },
      select: selectTemplateMessage,
    });
  }

  findAllByStoreId(storeId: number) {
    return this.prismaService.messageTemplate.findMany({
      where: { storeId },
      select: selectTemplateMessage,
    });
  }

  async findOne(id: number) {
    const template = await this.prismaService.messageTemplate.findUnique({
      where: { id },
      select: selectTemplateMessage,
    });
    if (!template) throw new NotFoundException('Message template not found.');
    return template;
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.prismaService.messageTemplate.update({
      where: { id },
      data: updateTemplateDto,
      select: selectTemplateMessage,
    });
  }

  async remove(id: number) {
    return this.prismaService.messageTemplate.delete({
      where: { id },
      select: selectTemplateMessage,
    });
  }
}
