import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log("createOrderDto", createOrderDto);
    const { products, description, ...invoiceData} = createOrderDto;

    console.log("invoice", invoiceData);

    return this.prisma.$transaction(async (tx) => {
      // 1. Buat order
      const order = await tx.order.create({
        data: {
          description,
          status: 'NOT_PAID',
        },
      });
      console.log("order", order);

      // 2. Ambil data produk variant berdasarkan ID produk dari DTO
      const productIds = products.map((p) => p.id);
      console.log("productIds", productIds);
      const productVariants = await tx.variant.findMany({
        where: { id: { in: productIds } },
      });
      console.log("productVariant", productVariants);

      // 3. Validasi produk variant
      const errors = [];

      products.forEach((product) => {
        const productVariant = productVariants.find((p) => p.id === product.id);

        if (!productVariant) {
          errors.push({
            id: product.id,
            message: 'Product variant not found',
          });
          return;
        }

        if (productVariant.stock < product.qty) {
          errors.push({
            id: product.id,
            message: 'Insufficient stock',
          });
        }

        if (!productVariant.isActive) {
          errors.push({
            id: product.id,
            message: 'Product variant is inactive',
            type: 'variant',
          });
        }
      });

      if (errors.length > 0) {
        throw {
          errors,
          statusCode: 422,
        };
      }

      // 4. Buat order details untuk setiap produk
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
      console.log("orderDetails", orderDetails);

      // 5. Buat order detail di database
      await tx.orderDetail.createMany({
        data: orderDetails,
      });

      // 6. Update stok produk variant
      for (const product of products) {
        await tx.variant.update({
          where: { id: product.id },
          data: { stock: { decrement: product.qty } },
        });
      }

      // 7. Hitung total harga semua produk
      const totalPrice = orderDetails.reduce((total, detail) => {
        return total + +detail.pricePerProduct * detail.qty;
      }, 0);

      console.log("totalprice", totalPrice);

      // 8. Buat invoice dengan harga total
      await tx.invoice.create({
        data: {
          prices: totalPrice,
          serviceChange: 'Your service charge',
          status: 'NOT_PAID',
          discount: null, // atau nilainya sesuai dengan kondisi Anda
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
          invoiceNumber: 'INV-' + new Date().getTime(),
          payment: { connect: { id: invoiceData.paymentId } }, //invoiceData.paymentId
          courier: { connect: { id: invoiceData.courierId } }, //invoiceData.courierId
          order: { connect: { id: order.id } },
        },
      });

      return order;
    });
  }

  async findAll() {
    return await this.prisma.order.findMany();
  }

  async findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      select: {
        status: true,
        orderDetails: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // async update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return await this.prisma.order.update({
  //     where: {id},
  //     data: updateOrderDto,
  //   })
  // }

  // async remove(id: number) {
  //   return this.prisma.$transaction(async (tx) => {
  //     // Hapus semua order details yang berhubungan dengan order yang akan dihapus
  //     await tx.orderDetail.deleteMany({
  //       where: { orderId: id },
  //     });

  //     // Setelah order details dihapus, hapus order-nya
  //     return await tx.order.delete({
  //       where: { id },
  //     });
  //   });
  // }
}
