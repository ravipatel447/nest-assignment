import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User, OrderDetails } from './';
import { orderStatus } from '../../constants';
import { Exclude, Type } from 'class-transformer';

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

  @Column()
  customerId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @OneToMany(() => OrderDetails, (OrderDetails) => OrderDetails.order)
  public OrderDetails: OrderDetails[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;
}
