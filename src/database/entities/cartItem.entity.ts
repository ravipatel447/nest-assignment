import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cart, Product } from './';

@Entity({ name: 'cartItem' })
export class CartItem {
  @PrimaryColumn()
  cartId: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'cartId',
    referencedColumnName: 'cartId',
    foreignKeyConstraintName: 'cartItem',
  })
  public cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'productId',
    foreignKeyConstraintName: 'productItem',
  })
  public product: Product;
}
