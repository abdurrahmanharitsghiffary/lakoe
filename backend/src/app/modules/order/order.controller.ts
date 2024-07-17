import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { BiteShipService } from 'src/common/services/biteship.service';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly biteshipService: BiteShipService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  @SkipAuth()
  async findAll() {
    const areaId = await this.biteshipService.getAreaID({
      countries: 'ID',
      input: 'Jakarta',
      type: 'single',
    });
    return {
      ...(await this.biteshipService.getShippingRates({
        origin_postal_code: 16330,
        destination_postal_code: 25000,
        couriers: ['jne', 'jnt', 'anteraja', 'gojek', 'grab'],
        items: [
          { name: 'JAMAL DOLL', quantity: 100, value: 10000, weight: 10 },
        ],
      })),
      areaId,
    };
  }

  @Get(':id')
  @SkipAuth()
  findById(@Param('id') id: string) {
    return this.orderService.findById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
