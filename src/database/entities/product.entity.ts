import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User, Order, Cart } from './';

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

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'sellerId', referencedColumnName: 'userId' })
  sellerId: User;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];

  @ManyToMany(() => Cart, (cart) => cart.products)
  @JoinTable({
    name: 'cartItem',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'productId',
    },
    inverseJoinColumn: {
      name: 'cartId',
      referencedColumnName: 'cartId',
    },
  })
  carts: Cart[];
}
