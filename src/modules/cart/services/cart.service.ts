import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItem, Product, User } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
  ) {}

  getCartIdOfUser(customerId: User): Promise<Cart> {
    return this.cartRepo.findOneBy({ customerId });
  }

  async addProductToCart(cartId: number, productId: number, quantity = 1) {
    let cartItem = await this.cartItemRepo.findOneBy({ cartId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepo.create({ cartId, productId, quantity });
    }
    await this.cartItemRepo.save(cartItem);
  }

  async getCartById(cartId: Cart) {
    return cartId.products;
  }
}
