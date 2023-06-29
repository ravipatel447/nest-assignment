import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItem, Product, User } from 'src/database/entities';
import { cartMessages } from 'src/messages';
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
    return { message: cartMessages.success.CART_ADD_PRODUCT_SUCCESS, data: {} };
  }

  async updateProductQntInCart(cart: Cart, product, quantity: number) {
    if (quantity === 0) return this.removeProductFromCart(cart, product);
    const cartItem = await this.findCartItem(cart, product);
    cartItem.quantity = quantity;
    await this.cartItemRepo.save(cartItem);
    return {
      message: cartMessages.success.CART_UPDATE_PRODUCT_SUCCESS,
      data: {},
    };
  }

  async removeProductFromCart(cart: Cart, product: Product) {
    const cartItem = await this.findCartItem(cart, product);
    await this.cartItemRepo.remove(cartItem);
    return {
      message: cartMessages.success.CART_REMOVE_PRODUCT_SUCCESS,
      data: {},
    };
  }

  async findCartItem(cart: Cart, product: Product) {
    const cartItem = await this.cartItemRepo.findOneBy({ cart, product });
    if (!cartItem) {
      throw new BadRequestException(cartMessages.error.CART_PRODUCT_NOT_FOUND);
    }
    return cartItem;
  }

  async getCartWithProducts(cart: Cart) {
    const cartwithProducts = await this.cartRepo
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.product', 'products')
      .where('cart.cartId = :id', { id: cart.cartId })
      .getOne();
    return {
      message: cartMessages.success.CART_FETCH_SUCCESS,
      data: {
        cart: cartwithProducts,
      },
    };
  }
}
