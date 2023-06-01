import { BadRequestException, Injectable } from '@nestjs/common';
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

  async updateProductQntInCart(cart: Cart, product, quantity: number) {
    if (quantity === 0) return this.removeProductFromCart(cart, product);
    const cartItem = await this.findCartItem(cart, product);
    cartItem.quantity = quantity;
    await this.cartItemRepo.save(cartItem);
    return { message: 'product has been updated' };
  }

  async removeProductFromCart(cart: Cart, product: Product) {
    const cartItem = await this.findCartItem(cart, product);
    await this.cartItemRepo.remove(cartItem);
    return { message: 'product has been removed' };
  }

  async findCartItem(cart: Cart, product: Product) {
    const cartItem = await this.cartItemRepo.findOneBy({ cart, product });
    if (!cartItem) {
      throw new BadRequestException('Product Not Found In Your Cart');
    }
    return cartItem;
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
