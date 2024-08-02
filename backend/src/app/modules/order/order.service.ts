import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { BiteshipService } from '@/common/modules/biteship/biteship.service';
import { ERR, ERROR_CODE } from '@/common/constants';
import {
  selectOrder,
  SelectOrderPayload,
  selectOrderSimplified,
  SelectOrderSimplifiedPayload,
} from '@/common/query/order.select';
import { FindAllOptions } from './dto/index.dto';
import { omitProperties } from '@/common/utils/omit-properties';
import { genInvoice } from '@/common/utils/gen-inv';
import { AddressService } from '../address/address.service';
import { StoreService } from '../store/store.service';
import { BiteshipCreateOrderOptions } from '@/common/types/biteship';
import { $Enums } from '@prisma/client';
import { coreMidtrans } from '@/common/libs/midtrans';
import { isAxiosError } from 'axios';
import { emptyArrayAndUndefined } from '@/common/utils/empty-array-and-undefined';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly biteshipService: BiteshipService,
    private readonly addressService: AddressService,
    private readonly storeService: StoreService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log('createOrderDto', createOrderDto);
    const {
      skus: skusDto,
      courier,
      orderNote,
      ...invoiceData
    } = createOrderDto;

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

      const storeId = storeIds.values().next().value;
      console.log(storeId, 'STOREID');
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
          message: 'Failed to create an order.',
          errors,
        });
      }

      // console.log(storeIds, 'STOREIDS');
      const storeAddress =
        await this.addressService.checkAddressMustExists(storeId);

      const courierService = await this.prismaService.courierService.findUnique(
        {
          where: {
            courierCode_courierServiceCode_storeId: {
              ...courier,
              storeId,
            },
          },
        },
      );

      if (!courierService)
        throw new BadRequestException(
          `The store has not activated the courier service for ${courier.courierCode} - ${courier.courierServiceCode}.`,
        );

      const order = await tx.order.create({
        data: {
          storeId,
          description: orderNote,
          status: 'NOT_PAID',
        },
      });

      console.log('productVariant', skus);

      const orderDetails = skusDto.map((sk) => {
        const sku = skus.find((p) => p.id === sk.id);
        return {
          orderId: order.id,
          skuId: sku.id,
          qty: sk.qty,
          pricePerProduct: sku.price,
          weightPerProductInGram: sku.weightInGram,
        };
      });

      const orderedSkus = await tx.orderDetail.createManyAndReturn({
        data: orderDetails,
        select: {
          qty: true,
          pricePerProduct: true,
          weightPerProductInGram: true,
          sku: {
            select: {
              sku: true,
              price: true,
              product: { select: { name: true, description: true } },
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

      const invoiceNumber = genInvoice();

      await tx.invoice.create({
        data: {
          amount: totalPrice,
          serviceCharge: 500,
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
          invoiceNumber,
          order: { connect: { id: order.id } },
        },
      });

      // const destAreaIdResponse = await this.biteshipService.getAreaID({
      //   countries: 'ID',
      //   input: invoice.receiverDistrict,
      //   type: 'single',
      // });

      // const destAreaId = destAreaIdResponse?.areas?.[0]?.id;

      // const originAreaIdResponse = await this.biteshipService.getAreaID({
      //   countries: 'ID',
      //   input: storeAddress.district,
      //   type: 'single',
      // });

      // const originAreaId = originAreaIdResponse?.areas?.[0]?.id;

      // const createOrderOptions: BiteshipCreateOrderOptions = {
      //   courier_company: courier.courierCode,
      //   courier_type: courier.courierServiceCode,
      //   order_note: order.description,
      //   delivery_type: 'now',
      //   reference_id: invoiceNumber,
      //   destination_address: invoice.receiverAddress,
      //   destination_contact_name: invoice.receiverContactName,
      //   destination_contact_phone: invoice.receiverContactPhone,
      //   destination_coordinate: {
      //     latitude: +invoice.receiverLatitude,
      //     longitude: +invoice.receiverLongitude,
      //   },
      //   origin_postal_code: +storeAddress.postalCode,
      //   origin_coordinate: {
      //     latitude: +storeAddress.latitude,
      //     longitude: +storeAddress.longitude,
      //   },
      //   origin_address: storeAddress.address,
      //   origin_contact_name: storeAddress.contactName,
      //   origin_contact_phone: storeAddress.contactPhone,
      //   items: createdOrder.map((order) => ({
      //     name: order.sku.product.name,
      //     sku: order.sku.sku,
      //     quantity: order.qty,
      //     value: +order.pricePerProduct,
      //     weight: order.weightPerProductInGram,
      //   })),
      //   destination_postal_code: +invoiceData.receiverPostalCode,
      // };

      // if (originAreaId) createOrderOptions.origin_area_id = originAreaId;
      // if (destAreaId) createOrderOptions.destination_area_id = destAreaId;

      // const biteshipOrder =
      //   await this.biteshipService.createOrder(createOrderOptions);

      // await tx.invoice.update({
      //   where: { id: invoice.id },
      //   data: { status: biteshipOrder.status },
      // });

      const shippingRate = await this.biteshipService.getShippingRates({
        couriers: [courier.courierCode as any],
        items: orderedSkus.map((orderDetail) => ({
          name: orderDetail.sku.product.name,
          sku: orderDetail.sku.sku,
          quantity: orderDetail.qty,
          value: +orderDetail.pricePerProduct,
          weight: orderDetail.weightPerProductInGram,
          description: orderDetail.sku.product.description,
        })),
        destination_postal_code: +invoiceData?.receiverPostalCode,
        origin_postal_code: +storeAddress?.postalCode,
        destination_latitude: +invoiceData?.receiverLatitude,
        destination_longitude: +invoiceData?.receiverLongitude,
        origin_latitude: +storeAddress?.latitude,
        origin_longitude: +storeAddress?.longitude,
      });

      const pricings = (shippingRate?.pricing ?? [])?.sort((a) => {
        if (a?.type === courier?.courierServiceCode) return -1;
        return 0;
      });

      const firstRate = pricings?.[0];

      await tx.courier.create({
        data: {
          biteshipWaybillId: '',
          biteshipOrderId: '',
          biteshipTrackingId: '',
          courierCode: firstRate.company,
          courierServiceCode: firstRate.type,
          price: firstRate.price,
          order: { connect: { id: order.id } },
        },
      });

      return order;
    });
  }

  async deliverOrder(
    orderId: string,
    collectionMethod: BiteshipCreateOrderOptions['origin_collection_method'] = 'pickup',
  ) {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        invoice: true,
        courier: true,
        store: { select: { id: true } },
        orderDetails: {
          select: {
            sku: { include: { product: true } },
            pricePerProduct: true,
            qty: true,
            weightPerProductInGram: true,
          },
        },
      },
    });

    const storeAddress = await this.addressService.checkAddressMustExists(
      order.storeId,
    );

    console.log(storeAddress, 'STORE ADDRESS');

    await this.storeService.checkCouriersMustExists(order.storeId);

    const destAreaIdResponse = await this.biteshipService.getAreaID({
      countries: 'ID',
      input: order.invoice.receiverDistrict,
      type: 'single',
    });

    const destAreaId = destAreaIdResponse?.areas?.[0]?.id;

    const originAreaIdResponse = await this.biteshipService.getAreaID({
      countries: 'ID',
      input: storeAddress.district,
      type: 'single',
    });

    const originAreaId = originAreaIdResponse?.areas?.[0]?.id;
    console.log(order.courier, 'COURIER');
    const createOrderOptions: BiteshipCreateOrderOptions = {
      courier_company: order.courier.courierCode,
      courier_type: order.courier.courierServiceCode,
      order_note: order.description,
      delivery_type: 'now',
      reference_id: order.id,
      destination_address: order.invoice.receiverAddress,
      destination_contact_name: order.invoice.receiverContactName,
      destination_contact_phone: order.invoice.receiverContactPhone,
      destination_coordinate: {
        latitude: +order.invoice.receiverLatitude,
        longitude: +order.invoice.receiverLongitude,
      },
      origin_collection_method: collectionMethod,
      origin_postal_code: +storeAddress.postalCode,
      origin_coordinate: {
        latitude: +storeAddress.latitude,
        longitude: +storeAddress.longitude,
      },
      origin_address: storeAddress.address,
      origin_contact_name: storeAddress.contactName,
      origin_contact_phone: storeAddress.contactPhone,
      items: order.orderDetails.map((order) => ({
        name: order.sku.product.name,
        sku: order.sku.sku,
        quantity: order.qty,
        value: +order.pricePerProduct,
        weight: order.weightPerProductInGram,
        description: order.sku.product.description,
      })),
      destination_postal_code: +order.invoice.receiverPostalCode,
    };

    if (originAreaId) createOrderOptions.origin_area_id = originAreaId;
    if (destAreaId) createOrderOptions.destination_area_id = destAreaId;

    const biteshipOrder =
      await this.biteshipService.createOrder(createOrderOptions);

    return biteshipOrder;
  }

  async getOrderTracking(orderId: string) {
    const order = await this.checkOrderMustExists(orderId);

    return await this.biteshipService.getTracking(
      order.courier.biteshipTrackingId,
    );
  }

  async getOrderPublicTracking(orderId: string) {
    const order = await this.checkOrderMustExists(orderId);

    return await this.biteshipService.getPublicTracking(
      order.courier.biteshipWaybillId,
      order.courier.courierCode,
    );
  }

  async findOne(id: string) {
    return this.checkOrderMustExists(id);
  }

  async checkOrderMustExists(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      select: selectOrder,
    });

    if (!order) throw new NotFoundException('Order is not found.');
    return order;
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

    const orders = await this.prismaService.order.findMany({
      where: {
        storeId,
        description: { contains: options?.q ?? '' },
        courier: {
          courierCode: {
            in: emptyArrayAndUndefined(options?.couriers?.split(',')),
          },
        },
        status: {
          in: emptyArrayAndUndefined(options?.status?.split(',')) as any,
        },
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

    if (!order) throw new NotFoundException('Order is not found.');

    console.log(order, 'ORDER');
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

  async changeOrderStatus(
    orderId: string,
    status: $Enums.OrderStatus,
    skipCheckOrder?: boolean,
  ) {
    if (!skipCheckOrder) await this.checkOrderMustExists(orderId);
    return this.prismaService.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async acceptOrder(orderId: string) {
    const order = await this.checkOrderMustExists(orderId);

    if (order?.status === 'READY_TO_DELIVER')
      throw new BadRequestException('Order already accepted.');

    if (order?.status !== 'NEW_ORDER')
      throw new BadRequestException(
        ERR.CHANGE_ORDER_STATUS_NOT_ACCEPTED(order.status),
      );

    return this.prismaService.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: 'READY_TO_DELIVER' },
        select: {
          id: true,
        },
      });

      try {
        return await this.deliverOrder(updatedOrder.id);
      } catch (err) {
        if (isAxiosError(err) && err?.response?.data?.code === 40002031) {
          console.log('YOYO MAMA');
          return await this.deliverOrder(updatedOrder.id, 'drop_off');
        }
      }
    });
  }

  async cancelOrder(orderId: string) {
    const order = await this.checkOrderMustExists(orderId);

    if (order?.status === 'CANCELLED')
      throw new BadRequestException('Order already cancelled.');
    if (order?.status !== 'NEW_ORDER')
      throw new BadRequestException(
        ERR.CHANGE_ORDER_STATUS_NOT_ACCEPTED(order.status),
      );

    return this.prismaService.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' },
        select: {
          invoice: {
            select: { payment: { select: { midtransOrderId: true } } },
          },
          orderDetails: { select: { skuId: true, qty: true } },
        },
      });

      await Promise.all(
        updatedOrder.orderDetails.map(async (detail) => {
          await tx.sKU.update({
            where: { id: detail.skuId },
            data: { stock: { increment: detail.qty } },
          });
        }),
      );

      const transaction = await coreMidtrans.transaction.status(
        updatedOrder.invoice.payment.midtransOrderId,
      );
      console.log(transaction, 'STATUS');

      const refunded = await coreMidtrans.transaction.refund(
        updatedOrder.invoice.payment.midtransOrderId,
      );
      console.log(refunded, 'Refunded');

      return updatedOrder;
    });
  }

  toOrderResponse(payload: SelectOrderSimplifiedPayload | SelectOrderPayload) {
    return {
      ...omitProperties(payload, ['orderDetails']),
      skus: payload.orderDetails,
    };
  }
}
