import {
  HttpCode,
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, createOrderSchema } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '@/common/decorators/skip-auth/skip-auth.decorator';
import { ZodValidationPipe } from '@/common/pipes/zod-validation/zod-validation.pipe';
import { OrderGuard } from './guards/order.guard';
import { ApiJwtBearerAuth } from '@/common/decorators/jwt-bearer.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @SkipAuth()
  async create(
    @Body(new ZodValidationPipe(createOrderSchema))
    createOrderDto: CreateOrderDto,
  ) {
    return await this.orderService.create(createOrderDto);
  }

  @Post(':id/accept')
  @ApiJwtBearerAuth()
  @UseGuards(OrderGuard)
  @HttpCode(HttpStatus.OK)
  async acceptOrder(@Param('id') orderId: string) {
    return this.orderService.acceptOrder(orderId);
  }

  @Post(':id/reject')
  @ApiJwtBearerAuth()
  @UseGuards(OrderGuard)
  @HttpCode(HttpStatus.OK)
  async rejectOrder(@Param('id') orderId: string) {
    return this.orderService.cancelOrder(orderId);
  }

  @Get(':id')
  @SkipAuth()
  findById(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get(':id/shipping-rates')
  @SkipAuth()
  getOrderShippingRates(@Param('id') id: string) {
    return this.orderService.getShippingRates(id);
  }

  @Get(':id/trackings')
  @SkipAuth()
  async findTrackingByOrderId(@Param('id') id: string) {
    const response = await this.orderService.getOrderTracking(id);
    console.log(response, 'TRACKING RESPONSE');
    return response?.history ?? [];
  }

  @Get(':id/public-trackings')
  @SkipAuth()
  async findPublicTrackingByOrderId(@Param('id') id: string) {
    const response = await this.orderService.getOrderPublicTracking(id);
    console.log(response, 'TRACKING RESPONSE');
    return response?.history ?? [];
  }
}
