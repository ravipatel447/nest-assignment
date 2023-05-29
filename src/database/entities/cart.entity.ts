import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { User, Product } from './';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'customerId', referencedColumnName: 'userId' })
  customerId: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'cartItem',
    joinColumn: {
      name: 'cartId',
      referencedColumnName: 'cartId',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'productId',
    },
  })
  products: Product[];
}
