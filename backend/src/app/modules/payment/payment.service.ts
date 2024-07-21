import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { snap } from 'src/common/libs/midtrans';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(orderId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: orderId,
        },
        select: {
          invoice: {
            select: {
              prices: true,
              courier: {
                select: {
                  price: true,
                },
              },
            },
          },
          products: {
            select: {
              qty: true,
              productVariant: {
                select: {
                  id: true,
                  price: true,
                  name: true,
                  product: {
                    select: {
                      store: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!order) throw new NotFoundException('Order not found');

      const midtransOrderId = uuidv4();
      const grossAmount =
        +order.invoice.prices + +order.invoice.courier.price + 500;

      const itemDetails = order.products.map((item) => ({
        id: item.productVariant.id.toString(),
        price: item.productVariant.price.toNumber(),
        quantity: item.qty,
        name: item.productVariant.name,
        brand: item.productVariant.product.store.name,
      }));

      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: midtransOrderId,
          gross_amount: grossAmount,
        },
        item_details: itemDetails,
      });

      const { token, order_id } = transaction;

      const payment = await tx.payment.create({
        data: {
          midtransOrderId: order_id,
          midtransTransactionId: token,
          status: 'pending',
          amount: grossAmount,
          paymentType: 'midtrans',
          order: {
            connect: {
              id: orderId,
            },
          },
        },
      });
      return transaction.redirectUrl;
    });
  }
}

// const orderId = uuidv4();
// const payments = await tx.payment.create({
//   data: {
//     midtransOrderId: orderId,
//     status: 'pending',
//     amount: +order.invoice.prices + +order.invoice.courier.price + 500,
//   },
// });
