import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import {
  AddCartItemDto,
  addCartItemSchema,
  CreateCartDto,
  createCartSchema,
  UpdateCartCountDto,
  updateCartCountSchema,
} from './dto/cart.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';

@ApiTags('Carts')
@Controller()
@SkipAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('cart-collections')
  createCartCollection() {
    return this.cartService.createCartCollection();
  }

  @Post('carts')
  async createCart(
    @Body(new ZodValidationPipe(createCartSchema)) createCartDto: CreateCartDto,
  ) {
    return this.cartService.createCart(createCartDto);
  }

  @Get('cart-collections/:id')
  findOneCartCollection(@Param('id') collectionId: string) {
    return this.cartService.findOneCartCollection(collectionId);
  }

  @Get('carts/:id')
  findOneCart(@Param('id') cartId: string) {
    return this.cartService.findOneCart(cartId);
  }

  @Get('carts/:id/skus')
  findAllItemsByCartId(@Param('id') cartId: string) {
    return this.cartService.findAllItemsByCartId(cartId);
  }

  @Put('carts/:id/skus/:skuId/increment')
  @HttpCode(HttpStatus.NO_CONTENT)
  incrementCartCount(
    @Param('id') cartId: string,
    @Param('skuId') skuId: string,
  ) {
    return this.cartService.increment(cartId, +skuId);
  }

  @Put('carts/:id/skus/:skuId/decrement')
  @HttpCode(HttpStatus.NO_CONTENT)
  decrementCartCount(
    @Param('id') cartId: string,
    @Param('skuId') skuId: string,
  ) {
    return this.cartService.decrement(cartId, +skuId);
  }

  @Put('carts/:id/skus/:skuId')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateCartCount(
    @Param('id') cartId: string,
    @Param('skuId') skuId: string,
    @Body(new ZodValidationPipe(updateCartCountSchema))
    updateCartCountDto: UpdateCartCountDto,
  ) {
    return this.cartService.updateCartCountOrDelete(
      cartId,
      +skuId,
      updateCartCountDto.count,
      true,
    );
  }

  @Put('cart-collections/:collectionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  addCartItems(
    @Param('collectionId') collectionId: string,
    @Body(new ZodValidationPipe(addCartItemSchema))
    addCartItemDto: AddCartItemDto,
  ) {
    return this.cartService.addCartItems(collectionId, addCartItemDto);
  }

  @Delete('cart-collections/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCartCollection(@Param('id') collectionId: string) {
    return this.cartService.removeCartCollection(collectionId);
  }

  @Delete('carts/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCart(@Param('id') cartId: string) {
    return this.cartService.removeCart(cartId);
  }
}
