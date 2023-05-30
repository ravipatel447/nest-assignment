import { Controller, Get } from '@nestjs/common';
import { User } from 'src/database/entities';
import { GetUser } from 'src/decorators';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get('my')
  getMyCart(@GetUser() user: User) {
    return this.cartService.getCartIdOfUser(user);
  }

  @Get()
  async getCartById(@GetUser() user: User) {
    const cart = await this.cartService.getCartIdOfUser(user);
    return this.cartService.getCartById(cart);
  }
}
