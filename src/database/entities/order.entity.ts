import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User, Product } from './';
import { orderStatus } from '../../constants';
import { Type } from 'class-transformer';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Type(() => Date)
  @Column({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'enum', enum: orderStatus, default: orderStatus.Processing })
  status: orderStatus;

  @Column()
  shippingAddress: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'customerId' })
  customerId: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'orderDetails',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'orderId',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'productId',
    },
  })
  products: Product[];
}
