import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { SkipAuth } from '@/common/decorators/skip-auth/skip-auth.decorator';
import { PaymentDto, PaymentId } from './payment.dto';

@Controller('payments')
@ApiTags('Payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @SkipAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  async pay(@Body() payment: PaymentDto) {
    console.log(payment, 'PAYMENT');
    const paymentUrl = await this.paymentService.createPayment(payment.orderId);

    return paymentUrl;
  }

  @SkipAuth()
  @Get()
  async allPayment() {
    return await this.paymentService.getPayment();
  }

  @SkipAuth()
  @Get(':id')
  async paymentId(@Param() payments: PaymentId) {
    return await this.paymentService.getPaymentById(payments.id);
  }

  @SkipAuth()
  @Post('notification')
  @HttpCode(HttpStatus.OK)
  async notif(@Body() notification: any) {
    console.log('test', notification);
    const updatedPayment =
      await this.paymentService.handleNotification(notification);
    return { received: true, updatedPayment };
  }
}
