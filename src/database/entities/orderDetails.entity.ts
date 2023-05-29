import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'orderDetails' })
export class OrderDetails {
  @PrimaryColumn({ name: 'productId' })
  productId: number;

  @PrimaryColumn({ name: 'orderId' })
  orderId: number;

  @Column({ name: 'quantity' })
  quantity: number;
}
