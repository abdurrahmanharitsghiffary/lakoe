import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, orderSchema } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';

@ApiTags('Orders')
@Controller('orders')
@SkipAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(orderSchema)) createOrderDto: CreateOrderDto,
  ) {
    return await this.orderService.create(createOrderDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get(':id/shipping-rates')
  getOrderShippingRates(@Param('id') id: string) {
    return this.orderService.getShippingRates(id);
  }

  @Get(':id/trackings')
  async findTrackingByOrderId(@Param('id') id: string) {
    const response = await this.orderService.getOrderTracking(id);
    console.log(response, 'TRACKING RESPONSE');
    return response?.history ?? [];
  }

  @Get(':id/public-trackings')
  async findPublicTrackingByOrderId(@Param('id') id: string) {
    const response = await this.orderService.getOrderPublicTracking(id);
    console.log(response, 'TRACKING RESPONSE');
    return response?.history ?? [];
  }
}
