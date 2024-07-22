import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { snap } from 'src/common/libs/midtrans';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(orderId: string) {
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: orderId,
        },
        select: {
          invoice: {
            select: {
              id: true,
              amount: true,
            },
          },
          orderDetails: {
            select: {
              qty: true,
              pricePerProduct: true,
              sku: {
                select: {
                  id: true,
                  product: {
                    select: {
                      name: true,
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
          courier: {
            select: {
              price: true,
            },
          },
        },
      });

      if (!order) throw new NotFoundException('Order not found');

      const midtransOrderId = uuidv4();
      const grossAmount =
        +order.orderDetails.reduce((total, detail) => {
          return total + detail.qty * detail.pricePerProduct.toNumber();
        }, 0) +
        +order.courier.price +
        500;

      const itemDetails = order.orderDetails.map((item) => ({
        id: item.sku.id.toString(),
        price: item.pricePerProduct.toNumber(),
        quantity: item.qty,
        name: item.sku.product.name,
        brand: item.sku.product.store.name,
      }));

      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: midtransOrderId,
          gross_amount: grossAmount,
        },
        item_details: itemDetails,
      });

      const { token, order_id } = transaction;

      await tx.payment.create({
        data: {
          midtransOrderId: order_id,
          bank: 'midtrans',
          status: 'pending',
          amount: grossAmount,
          paymentType: 'midtrans',
          currency: 'IDR',
          invoiceId: order.invoice.id,
        },
      });
      return { token, order_id };
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
