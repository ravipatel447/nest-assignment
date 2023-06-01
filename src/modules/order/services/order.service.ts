import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderStatus } from 'src/constants';
import {
  Cart,
  CartItem,
  Order,
  OrderDetails,
  User,
} from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepo: Repository<OrderDetails>,
  ) {}

  async placeOrder(cart: Cart, user: User) {
    const order = this.orderRepo.create({
      orderDate: new Date(),
      status: orderStatus.Processing,
      shippingAddress: user.address,
      customer: user,
    });
    await this.orderRepo.save(order);
    Promise.all(
      cart.cartItems.map((cartItem: CartItem) => {
        const orderDetail = this.orderDetailsRepo.create({
          product: cartItem.product,
          order: order,
          quantity: cartItem.quantity,
          productName: cartItem.product.productName,
          price: cartItem.product.productPrice,
        });
        return this.orderDetailsRepo.save(orderDetail);
      }),
    );
    return { message: 'your order Has been Successfully placed' };
  }

  async viewOrders(user: User) {
    return this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.OrderDetails', 'orderDetail')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .where('order.customerId = :id', { id: user.userId })
      .getMany();
  }
}
