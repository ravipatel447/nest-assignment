import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/database/entities';
import { GetUser } from 'src/decorators';
import { CartService } from 'src/modules/cart/services/cart.service';
import { UpdateOrderStatusDto } from '../Dtos/orderStatusUpdate.dto';
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
    return this.orderService.placeOrder(cartProducts.data.cart, user);
  }
  @Get()
  async viewOrders(@GetUser() user: User) {
    return this.orderService.viewOrders(user);
  }

  @Patch(':id/cancel')
  async cancelOrder(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.orderService.cancelOrder(orderId, user);
  }

  @Patch(':id/status')
  async updateStatusOfOrder(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() body: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatusOfOrder(orderId, body.status);
  }
}
