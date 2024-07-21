import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { snap } from 'src/common/libs/midtrans';

@Controller('payments')
@ApiTags('Payments')
export class PaymentController {
  @Post()
  @HttpCode(HttpStatus.OK)
  async pay() {
    // find order by orderId from body
    // get all product variants data from the orderDetails
    // add all the product data to the request body of snap
    // gross amount should take from invoice.prices and courier price
    // also add the user address and informations to the request body of snap
    // see midtrans docs for example
    // create new payment of the order see prisma schema
    // initial status of the payment should be pending
    // create the order_id it should be created with uuidv4
    // share order_id that already created with midtransOrderId column
    // midtransTransactionId should take from the created transaction id

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
