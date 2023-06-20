import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderStatus } from 'src/constants';
import {
  Cart,
  CartItem,
  Order,
  OrderDetails,
  User,
} from 'src/database/entities';
import { orderMessages } from 'src/messages/order.message';
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
    return {
      message: orderMessages.success.ORDER_CREATE_SUCCESS,
      data: { order },
    };
  }

  async viewOrders(userId: number, orderId?: number) {
    return await this.orderRepo
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.OrderDetails', 'od')
      .leftJoinAndSelect('od.product', 'p')
      .where('o.customerId = :id', { id: userId })
      .andWhere(orderId ? 'o.orderId = :oid' : 'true', { oid: orderId })
      .select([
        'o.orderId',
        'o.orderDate',
        'o.status',
        'o.shippingAddress',
        'o.customerId',
        'od.quantity',
        'od.price',
        'od.productName',
        'p',
      ])
      .getMany();
  }

  async cancelOrder(orderId: number, customerId: number) {
    const order = await this.findOrderById(orderId, { customerId });
    if (order.status === orderStatus.Delivered)
      throw new BadRequestException(orderMessages.error.ORDER_CANCEL_INVALID);
    order.status = orderStatus.Canceled;
    await this.orderRepo.save(order);
    return {
      message: orderMessages.success.ORDER_CANCEL_SUCCESS,
      data: order,
    };
  }

  async updateStatusOfOrder(orderId: number, status: orderStatus) {
    const order = await this.findOrderById(orderId);
    const isAllowed =
      Object.values(orderStatus).findIndex((val) => val === status) >
      Object.values(orderStatus).findIndex((val) => val === order.status);
    if (!isAllowed) {
      throw new BadRequestException(
        orderMessages.error.ORDER_STATUS_UPDATE_INVALID,
      );
    }
    order.status = status;
    await this.orderRepo.save(order);
    return {
      message: orderMessages.success.ORDER_STATUS_UPDATION_SUCCESS,
      data: order,
    };
  }

  async findOrderById(orderId: number, filters?: Partial<Order>) {
    const order = await this.orderRepo.findOneBy({ orderId, ...filters });
    if (!order) {
      throw new BadRequestException(orderMessages.error.ORDER_NOT_FOUND);
    }
    return order;
  }
}
