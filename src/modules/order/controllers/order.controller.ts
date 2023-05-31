import { Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/database/entities';
import { GetUser } from 'src/decorators';
import { CartService } from 'src/modules/cart/services/cart.service';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
  ) {}
  @Post()
  async placeOrder(@GetUser() user: User) {
    const cart = await this.cartService.getCartIdOfUser(user);
    const cartProducts = await this.cartService.getCartWithProducts(cart);
    return this.orderService.placeOrder(cartProducts, user);
  }
  @Get()
  async viewOrders(@GetUser() user: User) {
    // console.log(user);
    return this.orderService.viewOrders(user);
  }
}
