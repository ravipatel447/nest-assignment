import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product, Order, Cart } from './';
import { Role } from './role.entity';
import { Token } from './token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  roleId: number;

  @OneToMany(() => Product, (product) => product.sellerId)
  products: Product[];

  @OneToMany(() => Token, (token) => token.userId, { onDelete: 'CASCADE' })
  tokens: Token[];

  @OneToMany(() => Order, (order) => order.customerId)
  orders: Order[];

  @OneToOne(() => Cart, (cart) => cart.customerId)
  cartId: Cart;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'roleId' })
  role: Role;
}
