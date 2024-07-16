import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { snap } from 'src/common/libs/midtrans';

@Controller('payments')
export class PaymentController {
  @Post('pay')
  @HttpCode(HttpStatus.OK)
  async pay() {
    // also save the transaction order_id

    const params = {
      transaction_details: {
        order_id: Date.now().toString(),
        gross_amount: 200000,
      },
      credit_card: {
        secure: true,
      },
    };

    const token = await snap.createTransaction(params);

    return token;
  }
}
