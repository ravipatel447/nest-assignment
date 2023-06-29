import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { User, CartItem, OrderDetails } from './';
import { Exclude } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column({ type: 'varchar' })
  productImage: string;

  @Column()
  sellerId: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'sellerId', referencedColumnName: 'userId' })
  seller: User;

  @OneToMany(() => OrderDetails, (OrderDetails) => OrderDetails.product, {
    onDelete: 'SET NULL',
  })
  public OrderDetails: OrderDetails[];

  @OneToMany(() => CartItem, (CartItem) => CartItem.product, {
    onDelete: 'CASCADE',
  })
  public cartItems: CartItem[];

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;
}
