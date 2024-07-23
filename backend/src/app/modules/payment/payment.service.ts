import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { snap } from 'src/common/libs/midtrans';
import { MidtransNotification } from './payment.dto';

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
              id: true,
              price: true,
              courierCode: true,
              courierServiceCode: true,
            },
          },
        },
      });

      if (!order) throw new NotFoundException('Order not found');

      const itemDetails = order.orderDetails.map((item) => {
        if (!item.sku || !item.sku.product || !item.sku.product.store) {
          throw new BadRequestException(
            'Order detail is missing for information',
          );
        }
        return {
          id: item.sku.id.toString(),
          price: item.pricePerProduct.toNumber(),
          quantity: item.qty,
          name: item.sku.product.name,
          brand: item.sku.product.store.name,
        };
      });

      const grossAmountForItem = itemDetails.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      const courierPrice = order.courier.price.toNumber();
      const additionalCharge = 500;
      const grossAmount = grossAmountForItem + courierPrice + additionalCharge;

      const midtransOrderId = uuidv4();
      const additionalId = uuidv4();
      const invoiceAmount = order.invoice.amount.toNumber();
      const invoiceTotal = invoiceAmount + courierPrice + additionalCharge;
      if (grossAmount !== invoiceTotal) {
        throw new BadRequestException(
          'Calculated gross amount does not match the invoice amount',
        );
      }

      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: midtransOrderId,
          gross_amount: grossAmount,
        },
        item_details: [
          ...itemDetails,
          {
            id: `${order.courier.courierCode}`,
            price: `${order.courier.price}`,
            quantity: 1,
            name: `courier service charge`,
          },
          {
            id: additionalId,
            price: 500,
            quantity: 1,
            name: 'additional charge',
          },
        ],
      });

      console.log('transaction:', transaction);

      const { token, order_id, redirect_url } = transaction;

      await tx.payment.create({
        data: {
          midtransOrderId,
          bank: 'unknown',
          status: 'pending',
          amount: grossAmount,
          paymentType: 'midtrans',
          currency: 'IDR',
          cardType: '',
          invoiceId: order.invoice.id,
        },
      });
      return { token, order_id, redirect_url };
    });
  }

  async getPayment() {
    return await this.prisma.payment.findMany();
  }

  async getPaymentById(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id,
      },
    });

    if (!payment) throw new NotFoundException(`Payment with ${id} not found`);

    return payment;
  }

  async handleNotification(notification: any) {
    const statusResponse = (await snap.transaction.notification(
      notification,
    )) as MidtransNotification;
    console.log('status:', statusResponse);

    const updateData = {
      status: statusResponse.transaction_status,
      paymentType: statusResponse.payment_type,
      cardType: statusResponse.card_type,
      bank: statusResponse.bank,
    };

    const updatedPayment = await this.prisma.payment.update({
      where: {
        midtransOrderId: statusResponse.order_id,
      },
      data: updateData,
    });

    return updatedPayment;
  }
}
