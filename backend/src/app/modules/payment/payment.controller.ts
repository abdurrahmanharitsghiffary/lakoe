import { Controller } from '@nestjs/common';
import { snap } from 'src/common/libs/midtrans';

@Controller('payments')
export class PaymentController {
  async pay() {
    const params = {
      transaction_details: {
        order_id: 'test-transaction-123',
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
