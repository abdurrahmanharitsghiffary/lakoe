import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { BiteshipService } from 'src/common/modules/biteship/biteship.service';
import { ERROR_CODE } from 'src/common/contants';
import {
  selectOrder,
  selectOrderSimplified,
} from 'src/common/query/order.select';
import { FindAllOptions } from './dto/index.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly biteshipService: BiteshipService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log('createOrderDto', createOrderDto);
    const { products, description, ...invoiceData } = createOrderDto;

    console.log('invoice', invoiceData);

    return this.prismaService.$transaction(async (tx) => {
      const storeIds = new Set();
      const productIds = products.map((p) => p.id);

      const productVariants = await tx.variant.findMany({
        where: { id: { in: productIds } },
        include: { product: { select: { storeId: true, isActive: true } } },
      });

      productVariants.forEach((p) => {
        storeIds.add(p.product.storeId);
      });

      if (storeIds.size > 1)
        throw new BadRequestException(
          'You cannot order products from multiple stores in a single transaction.',
        );

      const errors = [];

      products.forEach((product) => {
        const productVariant = productVariants.find((p) => p.id === product.id);

        if (!productVariant) {
          errors.push({
            id: product.id,
            message: 'Product variant not found.',
            code: ERROR_CODE.NOT_FOUND,
          });
          return;
        }

        if (productVariant.stock < product.qty) {
          errors.push({
            id: product.id,
            message: 'Insufficient stock.',
            code: ERROR_CODE.INSUFFICIENT_STOCK,
          });
        }

        if (!productVariant.product.isActive) {
          errors.push({
            id: product.id,
            message: 'Product is inactive.',
            code: ERROR_CODE.NOT_ACTIVE,
          });
        }

        if (!productVariant.isActive) {
          errors.push({
            id: product.id,
            message: 'Product variant is inactive.',
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

      console.log('productVariant', productVariants);

      const orderDetails = products.map((product) => {
        const productVariant = productVariants.find((p) => p.id === product.id);
        return {
          orderId: order.id,
          productVariantId: productVariant.id,
          qty: product.qty,
          pricePerProduct: productVariant.price,
          weightPerProductInGram: productVariant.weightInGram,
        };
      });
      console.log('orderDetails', orderDetails);

      const createdOrder = await tx.orderDetail.createManyAndReturn({
        data: orderDetails,
        select: {
          qty: true,
          pricePerProduct: true,
          weightPerProductInGram: true,
          productVariant: { select: { name: true, price: true } },
        },
      });

      for (const product of products) {
        await tx.variant.update({
          where: { id: product.id },
          data: { stock: { decrement: product.qty } },
        });
      }

      const totalPrice = orderDetails.reduce((total, detail) => {
        return total + +detail.pricePerProduct * detail.qty;
      }, 0);

      console.log('totalprice', totalPrice);

      const invoice = await tx.invoice.create({
        data: {
          status: 'idk',
          prices: totalPrice,
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
          invoiceNumber: 'INV-' + Date.now(),
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
          name: order.productVariant.name,
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
          invoice: { connect: { id: invoice.id } },
          biteshipOrderId: biteshipOrder.id,
          biteshipTrackingId: biteshipOrder.courier.tracking_id,
          courierCode: biteshipOrder.courier.company,
          courierServiceCode: biteshipOrder.courier.type,
          courierServiceName: 'PLACEHOLDER DATA',
          price: biteshipOrder.price,
        },
      });

      return order;
    });
  }

  async getOrderTracking(orderId: number) {
    const order = await this.findOne(orderId);

    return await this.biteshipService.getTracking(
      order.invoice.courier.biteshipTrackingId,
    );
  }

  async getOrderPublicTracking(orderId: number) {
    const order = await this.findOne(orderId);

    return await this.biteshipService.getPublicTracking(
      order.invoice.courier.biteshipWaybillId,
      order.invoice.courier.courierCode,
    );
  }

  async findOne(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      select: selectOrder,
    });

    if (!order) throw new NotFoundException('Order not found.');
    return {
      ...order,
      products: order.products.map((product) => product.productVariant),
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
        invoice: {
          courier: { courierCode: { in: options?.couriers?.split(',') } },
        },
        status: { in: options?.status?.split(',') as any },
      },
      orderBy: [{ createdAt: createdDateSortOption }, { id: 'asc' }],
      select: selectOrderSimplified,
    });

    return orders.map((order) => ({
      ...order,
      products: order.products.map((product) => product.productVariant),
    }));
  }

  async getShippingRates(orderId: number) {
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
        products: {
          select: {
            qty: true,
            pricePerProduct: true,
            productVariantId: true,
            orderId: true,
            weightPerProductInGram: true,
            productVariant: {
              select: {
                product: { select: { storeId: true, description: true } },
                name: true,
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
      items: order.products.map((orderDetail) => ({
        name: orderDetail.productVariant.name,
        quantity: orderDetail.qty,
        value: +orderDetail.pricePerProduct,
        weight: orderDetail.weightPerProductInGram,
        description: orderDetail.productVariant.product.description,
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
}
