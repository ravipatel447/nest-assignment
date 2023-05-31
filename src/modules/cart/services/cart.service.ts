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

  getCartIdOfUser(customer: User): Promise<Cart> {
    return this.cartRepo.findOneBy({ customer });
  }

  async addProductToCart(cart: Cart, product: Product, quantity = 1) {
    let cartItem = await this.cartItemRepo.findOneBy({ cart, product });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepo.create({ cart, product, quantity });
    }
    await this.cartItemRepo.save(cartItem);
    return { message: 'product has been added' };
  }

  async getCartWithProducts(cart: Cart) {
    return this.cartRepo
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.product', 'products')
      .where('cart.cartId = :id', { id: cart.cartId })
      .getOne();
  }

  async getAllCart() {
    return this.cartRepo.find();
  }
}
