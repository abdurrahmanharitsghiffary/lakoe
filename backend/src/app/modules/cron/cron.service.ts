import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class CronService {
  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleTokenDeletion() {
    await this.prismaService.token.deleteMany({
      where: { expiresAt: { lt: new Date(Date.now()) } },
    });
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleLogger() {
    console.log('HELLO FROM CRON');
  }
}
