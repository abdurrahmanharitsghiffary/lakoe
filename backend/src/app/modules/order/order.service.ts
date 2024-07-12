import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, productVariantId, courier, ...data } = createOrderDto;
    return await this.prisma.order.create({
      data: {
        ...data,
        status: "NOT_PAID",
        user: userId ? { connect: { id: userId } } : undefined,
        productVariant: { connect: { id: productVariantId } },
        courier: {
          create: {
            courierCode: courier.courierCode,
            courierServiceCode: courier.courierServiceCode,
            courierServiceName: courier.courierServiceName,
            price: courier.price
          }
        }
      }
    } 
    );
  }

  async findAll() {
    return await this.prisma.order.findMany()
  }

  async findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      select: {
        status: true,
        qty: true,
        pricePerProduct: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  }

  // async update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return await this.prisma.order.update({
  //     where: {id},
  //     data: updateOrderDto,
  //   })
  // }

  async remove(id: number) {
    return await this.prisma.order.delete({
      where: { id }
    })
  }
}
