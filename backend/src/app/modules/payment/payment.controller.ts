import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { PaymentDto } from './payment.dto';

@Controller('payments')
@ApiTags('Payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @SkipAuth()
  @Post(':orderId')
  @HttpCode(HttpStatus.OK)
  async pay(@Param() payment: PaymentDto) {
    const paymentUrl = await this.paymentService.createPayment(payment.orderId);
    return { paymentUrl };
    // also save the transaction order_id

    // const params = {
    //   transaction_details: {
    //     order_id: Date.now().toString(),
    //     gross_amount: 200000,
    //   },
    //   credit_card: {
    //     secure: true,
    //   },
    // };

    // const token = await snap.createTransaction(params);

    // return token;
  }
}
