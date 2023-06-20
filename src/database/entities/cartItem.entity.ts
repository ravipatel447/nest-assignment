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

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({
    name: 'cartId',
    referencedColumnName: 'cartId',
    foreignKeyConstraintName: 'cartItem',
  })
  public cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'productId',
    foreignKeyConstraintName: 'productItem',
  })
  public product: Product;
}
