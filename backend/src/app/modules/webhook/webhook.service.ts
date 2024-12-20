import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from '@/common/services/prisma.service';
import { OrderStatusEvent } from '@/common/types/biteship/order-status';
import { OrderService } from '../order/order.service';
import { coreMidtrans } from '@/common/libs/midtrans';

@Injectable()
export class WebhookService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderService: OrderService,
  ) {}

  async biteshipStatusEvent(biteshipStatusEventPayload: OrderStatusEvent) {
    const orderId = biteshipStatusEventPayload.order_id;
    const order = await this.orderService.findOne(orderId);
    console.log(order, 'ORDER');
    const statusMapping: {
      [key: string]: $Enums.OrderStatus;
    } = {
      confirmed: $Enums.OrderStatus.READY_TO_DELIVER,
      droppingOff: $Enums.OrderStatus.ON_DELIVERY,
      delivered: $Enums.OrderStatus.SUCCESS,
      rejected: $Enums.OrderStatus.CANCELLED,
      courierNotFound: $Enums.OrderStatus.CANCELLED,
      returned: $Enums.OrderStatus.CANCELLED,
      cancelled: $Enums.OrderStatus.CANCELLED,
      disposed: $Enums.OrderStatus.CANCELLED,
    };

    const newStatus = statusMapping[biteshipStatusEventPayload.status];

    if (newStatus) {
      if (newStatus !== 'CANCELLED') {
        return await this.prismaService.order.update({
          where: { id: orderId },
          data: { status: newStatus },
        });
      }

      const cancelledOrder = await this.orderService.cancelOrder(orderId);
      await coreMidtrans.transaction.refund(
        cancelledOrder.invoice.payment.midtransOrderId,
      );
      return cancelledOrder;
    }
  }
}
