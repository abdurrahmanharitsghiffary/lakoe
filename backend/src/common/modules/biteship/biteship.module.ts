import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BiteshipService } from './biteship.service';

const BITESHIP_BASE_API_URL = 'https://api.biteship.com';

@Module({
  imports: [
    HttpModule.register({
      baseURL: BITESHIP_BASE_API_URL + '/v1',
      headers: { Authorization: process.env.BITESHIP_API_KEY },
    }),
  ],
  providers: [BiteshipService],
  exports: [BiteshipService],
})
export class BiteshipModule {}
