import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { BiteshipService } from 'src/common/modules/biteship/biteship.service';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly biteshipService: BiteshipService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get(':id/shipping-rates')
  @SkipAuth()
  getOrderShippingRates(@Param('id') id: string) {
    return this.orderService.getShippingRates(+id);
  }

  @Get(':id/trackings')
  @SkipAuth()
  async findTrackingByOrderId(@Param('id') id: string) {
    const response = await this.orderService.getOrderTracking(+id);
    console.log(response, 'TRACKING RESPONSE');
    return response?.history ?? [];
  }

  @Get(':id/public-trackings')
  @SkipAuth()
  async findPublicTrackingByOrderId(@Param('id') id: string) {
    const response = await this.orderService.getOrderPublicTracking(+id);
    console.log(response, 'TRACKING RESPONSE');
    return response?.history ?? [];
  }

  @Get('bts/:id')
  testBiteship(@Param('id') id: string) {
    return this.biteshipService.getOrder(id);
  }
}
