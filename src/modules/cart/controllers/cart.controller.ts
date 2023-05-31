import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from 'src/database/entities';
import { GetUser } from 'src/decorators';
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
  async getMyCart(@GetUser() user: User) {
    const cart = await this.cartService.getCartIdOfUser(user);
    return this.cartService.getCartWithProducts(cart);
  }

  @Post('add')
  async addToCart(@GetUser() user: User, @Body() body: CreateCartItemDto) {
    const cart = await this.cartService.getCartIdOfUser(user);
    const product = await this.productService.findProductById(body.productId);
    return this.cartService.addProductToCart(cart, product, body.quantity);
  }

  @Get('all')
  async allCart() {
    return this.cartService.getAllCart();
  }
}
