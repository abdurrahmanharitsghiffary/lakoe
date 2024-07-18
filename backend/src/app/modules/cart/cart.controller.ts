import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { User } from 'src/common/decorators/user';
import { UserPayload } from 'src/common/types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { z } from 'zod';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Carts')
@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('carts')
  create(@User() user: UserPayload, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(user?.id, createCartDto);
  }

  @Get('me/carts')
  findAll(@User() user: UserPayload) {
    return this.cartService.findAllByUserId(user?.id);
  }

  @Patch('carts/:variantId/decrement')
  @HttpCode(HttpStatus.NO_CONTENT)
  decrementQty(@Param('variantId') id: string, @User() user: UserPayload) {
    return this.cartService.decrement(user?.id, +id);
  }

  @Patch('carts/:variantId/increment')
  @HttpCode(HttpStatus.NO_CONTENT)
  incrementQty(@Param('variantId') id: string, @User() user: UserPayload) {
    return this.cartService.decrement(user?.id, +id);
  }

  @Patch('carts/:variantId')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateQty(
    @Param('variantId') id: string,
    @User() user: UserPayload,
    @Body('qty', new ZodValidationPipe(z.number())) qty: number,
  ) {
    return this.cartService.updateQty(user?.id, +id, qty);
  }

  @Delete('carts/:variantId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('variantId') id: string, @User() user: UserPayload) {
    return this.cartService.remove(user?.id, +id);
  }
}
