import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { User, CartItem } from './';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @Column()
  customerId: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'customerId',
    referencedColumnName: 'userId',
    foreignKeyConstraintName: 'cartUser',
  })
  customer: User;

  @OneToMany(() => CartItem, (CartItem) => CartItem.cart)
  public cartItems: CartItem[];
}
