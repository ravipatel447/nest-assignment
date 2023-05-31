import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order, Product } from './';

@Entity({ name: 'orderDetails' })
export class OrderDetails {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  orderId: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column()
  price: number;

  @Column()
  productName: string;

  @ManyToOne(() => Order, (order) => order.OrderDetails, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'orderId',
    referencedColumnName: 'orderId',
  })
  public order: Order;

  @ManyToOne(() => Product, (product) => product.OrderDetails)
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'productId',
  })
  public product: Product;
}
