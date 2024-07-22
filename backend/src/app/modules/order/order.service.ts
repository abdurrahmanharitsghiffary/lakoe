import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { BiteshipService } from 'src/common/modules/biteship/biteship.service';
import { ERR, ERROR_CODE } from 'src/common/constants';
import {
  selectOrder,
  selectOrderSimplified,
  SelectOrderSimplifiedPayload,
} from 'src/common/query/order.select';
import { FindAllOptions } from './dto/index.dto';
import { omitProperties } from 'src/common/utils/omit-properties';
import { genInvoice } from 'src/common/utils/gen-inv';
import { AddressService } from '../address/address.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly biteshipService: BiteshipService,
    private readonly addressService: AddressService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log('createOrderDto', createOrderDto);
    const { skus: skusDto, description, ...invoiceData } = createOrderDto;

    console.log('invoice', invoiceData);

    return this.prismaService.$transaction(async (tx) => {
      const storeIds = new Set();
      const skuIds = skusDto.map((p) => p.id);

      const skus = await tx.sKU.findMany({
        where: { id: { in: skuIds } },
        include: { product: { select: { storeId: true, isActive: true } } },
      });

      skus.forEach((p) => {
        storeIds.add(p.product.storeId);
      });

      if (storeIds.size > 1)
        throw new BadRequestException(
          'You cannot order skus from multiple stores in a single transaction.',
        );

      const addresses = await this.addressService.findAllByStoreId(storeIds[0]);

      if (addresses.length === 0)
        throw new BadRequestException(ERR.UNABLE_CALCULATE_SHIPPING_RATE);

      const errors = [];

      skusDto.forEach((sk) => {
        const sku = skus.find((p) => p.id === sk.id);

        if (!sku) {
          errors.push({
            skuId: sk.id,
            message: 'Product sku is not found.',
            code: ERROR_CODE.NOT_FOUND,
          });
          return;
        }

        if (sku.stock < sk.qty) {
          errors.push({
            skuId: sk.id,
            message: 'Insufficient stock.',
            code: ERROR_CODE.INSUFFICIENT_STOCK,
          });
        }

        if (!sku.product.isActive) {
          errors.push({
            skuId: sk.id,
            productId: sku.productId,
            message: 'Product is inactive.',
            code: ERROR_CODE.NOT_ACTIVE,
          });
        }

        if (!sku.isActive) {
          errors.push({
            skuId: sk.id,
            message: 'Product sku is inactive.',
            code: ERROR_CODE.NOT_ACTIVE,
          });
        }
      });

      if (errors.length > 0) {
        throw new BadRequestException({
          success: false,
          message: 'Failed to create an order.',
          errors,
        });
      }

      const order = await tx.order.create({
        data: { storeId: storeIds?.[0], description, status: 'NOT_PAID' },
      });

      console.log('productVariant', skus);

      const orderDetails = skusDto.map((sk) => {
        const sku = skus.find((p) => p.id === sku.id);
        return {
          orderId: order.id,
          skuId: sku.id,
          qty: sk.qty,
          pricePerProduct: sku.price,
          weightPerProductInGram: sku.weightInGram,
        };
      });

      const createdOrder = await tx.orderDetail.createManyAndReturn({
        data: orderDetails,
        select: {
          qty: true,
          pricePerProduct: true,
          weightPerProductInGram: true,
          sku: {
            select: {
              sku: true,
              price: true,
              product: { select: { name: true } },
            },
          },
        },
      });

      for (const sku of skusDto) {
        await tx.sKU.update({
          where: { id: sku.id },
          data: { stock: { decrement: sku.qty } },
        });
      }

      const totalPrice = orderDetails.reduce((total, detail) => {
        return total + +detail.pricePerProduct * detail.qty;
      }, 0);

      console.log('totalprice', totalPrice);

      const invoice = await tx.invoice.create({
        data: {
          status: 'pending',
          amount: totalPrice,
          serviceCharge: 0,
          receiverContactName: invoiceData.receiverContactName,
          receiverContactPhone: invoiceData.receiverContactPhone,
          receiverName: invoiceData.receiverName,
          receiverAddressPhone: invoiceData.receiverAddressPhone,
          receiverAddress: invoiceData.receiverAddress,
          receiverPostalCode: invoiceData.receiverPostalCode,
          receiverCity: invoiceData.receiverCity,
          receiverDistrict: invoiceData.receiverDistrict,
          receiverProvince: invoiceData.receiverProvince,
          receiverLatitude: invoiceData.receiverLatitude,
          receiverLongitude: invoiceData.receiverLongitude,
          invoiceNumber: genInvoice(),
          order: { connect: { id: order.id } },
        },
      });

      const biteshipOrder = await this.biteshipService.createOrder({
        courier_company: 'jne',
        courier_type: 'reg',
        order_note: order.description,
        delivery_type: 'now',
        reference_id: Date.now().toString(),
        destination_note: 'Hello world',
        destination_address: invoice.receiverAddress,
        destination_contact_name: invoice.receiverContactName,
        destination_contact_phone: invoice.receiverContactPhone,
        destination_coordinate: {
          latitude: +invoice.receiverLatitude,
          longitude: +invoice.receiverLongitude,
        },
        origin_postal_code: 16330,
        origin_coordinate: {
          latitude: -6.439818032404368,
          longitude: 106.69847946516565,
        },
        origin_address: 'Lebak Bulus MRT...',
        origin_contact_name: 'JAMAL BOOLEAN',
        origin_contact_phone: '+6285612122121',
        items: createdOrder.map((order) => ({
          name: order.sku.product.name,
          sku: order.sku.sku,
          quantity: order.qty,
          value: +order.pricePerProduct,
          weight: order.weightPerProductInGram,
        })),
      });

      await tx.invoice.update({
        where: { id: invoice.id },
        data: { status: biteshipOrder.status },
      });

      await tx.courier.create({
        data: {
          orderId: order.id,
          biteshipOrderId: biteshipOrder.id,
          biteshipTrackingId: biteshipOrder.courier.tracking_id,
          courierCode: biteshipOrder.courier.company,
          courierServiceCode: biteshipOrder.courier.type,
          price: biteshipOrder.price,
        },
      });

      return order;
    });
  }

  async getOrderTracking(orderId: string) {
    const order = await this.findOne(orderId);

    return await this.biteshipService.getTracking(
      order.courier.biteshipTrackingId,
    );
  }

  async getOrderPublicTracking(orderId: string) {
    const order = await this.findOne(orderId);

    return await this.biteshipService.getPublicTracking(
      order.courier.biteshipWaybillId,
      order.courier.courierCode,
    );
  }

  async findOne(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      select: selectOrder,
    });

    if (!order) throw new NotFoundException('Order not found.');
    return this.toOrderResponse(order);
  }

  async getAllStatusCount(storeId: number) {
    const [
      cancelledCount,
      newOrderCount,
      notPaidCount,
      onDeliveryCount,
      readyToDeliverCount,
      successCount,
    ] = await this.prismaService.$transaction([
      this.prismaService.order.count({
        where: { storeId, status: 'CANCELLED' },
      }),
      this.prismaService.order.count({
        where: { storeId, status: 'NEW_ORDER' },
      }),
      this.prismaService.order.count({
        where: { storeId, status: 'NOT_PAID' },
      }),
      this.prismaService.order.count({
        where: { storeId, status: 'ON_DELIVERY' },
      }),
      this.prismaService.order.count({
        where: { storeId, status: 'READY_TO_DELIVER' },
      }),
      this.prismaService.order.count({ where: { storeId, status: 'SUCCESS' } }),
    ]);

    return {
      _count: {
        CANCELLED: cancelledCount,
        NEW_ORDER: newOrderCount,
        NOT_PAID: notPaidCount,
        ON_DELIVERY: onDeliveryCount,
        READY_TO_DELIVER: readyToDeliverCount,
        SUCCESS: successCount,
      },
    };
  }

  async findAllByStoreId(storeId: number, options: FindAllOptions) {
    let createdDateSortOption: 'desc' | 'asc' = 'desc';

    switch (options?.sort_by) {
      case 'oldest':
        createdDateSortOption = 'asc';
        break;
      case 'latest':
        createdDateSortOption = 'desc';
        break;
    }

    const counts = await this.prismaService.order.count({
      select: { status: true },
    });

    console.log(counts);

    const orders = await this.prismaService.order.findMany({
      where: {
        storeId,
        description: { contains: options?.q ?? '' },
        courier: {
          courierCode: { in: options?.couriers?.split(',') },
        },
        status: { in: options?.status?.split(',') as any },
      },
      orderBy: [{ createdAt: createdDateSortOption }, { id: 'asc' }],
      select: selectOrderSimplified,
    });

    return orders.map((order) => this.toOrderResponse(order));
  }

  async getShippingRates(orderId: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      select: {
        storeId: true,
        invoice: true,
        store: {
          select: {
            addresses: { take: 1, orderBy: { isMainLocation: 'desc' } },
          },
        },
        orderDetails: {
          select: {
            qty: true,
            pricePerProduct: true,
            skuId: true,
            orderId: true,
            weightPerProductInGram: true,
            sku: {
              select: {
                product: {
                  select: { storeId: true, description: true, name: true },
                },
                sku: true,
              },
            },
          },
        },
      },
    });

    const availableCouriers = await this.prismaService.courierService.findMany({
      where: {
        storeId: order?.storeId,
      },
    });

    const couriersCode = availableCouriers.map(
      (courier) => courier.courierCode,
    );

    const storeAddress = order.store.addresses?.[0];
    console.log(storeAddress, 'STORE ADDRESS');
    console.log(order?.invoice, 'INVOICE');
    const response = await this.biteshipService.getShippingRates({
      couriers: couriersCode as any,
      items: order.orderDetails.map((orderDetail) => ({
        name: orderDetail.sku.product.name,
        sku: orderDetail.sku.sku,
        quantity: orderDetail.qty,
        value: +orderDetail.pricePerProduct,
        weight: orderDetail.weightPerProductInGram,
        description: orderDetail.sku.product.description,
      })),
      destination_postal_code: +order?.invoice?.receiverPostalCode,
      origin_postal_code: +storeAddress?.postalCode,
      destination_latitude: +order?.invoice?.receiverLatitude,
      destination_longitude: +order?.invoice?.receiverLongitude,
      origin_latitude: +storeAddress?.latitude,
      origin_longitude: +storeAddress?.longitude,
    });

    return response?.pricing;
  }

  toOrderResponse(payload: SelectOrderSimplifiedPayload) {
    return {
      ...omitProperties(payload, ['orderDetails']),
      skus: payload.orderDetails,
    };
  }
}
