import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionsEnum } from 'src/constants';
import { User } from 'src/database/entities';
import { GetUser } from 'src/decorators';
import { RequirePermissions } from 'src/decorators/requirePermission.decorator';
import { ProductService } from 'src/modules/product/services/product.service';
import { CreateCartItemDto } from '../Dtos/createCartItem.dto';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  @Get('my')
  @RequirePermissions(PermissionsEnum.Cart, 'read', 'OWNER')
  async getMyCart(@GetUser() user: User) {
    const cart = await this.cartService.getCartIdOfUser(user);
    return this.cartService.getCartWithProducts(cart);
  }

  @Post('cartItem')
  @RequirePermissions(PermissionsEnum.Cart, 'create', 'OWNER')
  async addToCart(@GetUser() user: User, @Body() body: CreateCartItemDto) {
    const cart = await this.cartService.getCartIdOfUser(user);
    const product = await this.productService.findProductById(body.productId);
    return this.cartService.addProductToCart(cart, product, body.quantity);
  }

  @Patch('cartItem')
  @RequirePermissions(PermissionsEnum.Cart, 'update', 'OWNER')
  async updateProductInCart(
    @GetUser() user: User,
    @Body() body: CreateCartItemDto,
  ) {
    const cart = await this.cartService.getCartIdOfUser(user);
    const product = await this.productService.findProductById(body.productId);
    return this.cartService.updateProductQntInCart(
      cart,
      product,
      body.quantity,
    );
  }

  @Delete('cartItem/:productId')
  @RequirePermissions(PermissionsEnum.Cart, 'delete', 'OWNER')
  async removeProductFromCart(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const cart = await this.cartService.getCartIdOfUser(user);
    const product = await this.productService.findProductById(productId);
    return this.cartService.removeProductFromCart(cart, product);
  }
}
