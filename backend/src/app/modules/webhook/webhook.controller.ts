import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { OrderStatusEvent } from '@/common/types/biteship/order-status';
import { SkipAuth } from '@/common/decorators/skip-auth/skip-auth.decorator';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('biteship/status')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  async biteshipStatus(@Body() biteshipStatusEventPayload: OrderStatusEvent) {
    console.log(biteshipStatusEventPayload, 'PAYLOD');
    return this.webhookService.biteshipStatusEvent(biteshipStatusEventPayload);
  }
}
