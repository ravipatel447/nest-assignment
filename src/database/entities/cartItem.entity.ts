import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cartItem' })
export class CartItem {
  @PrimaryColumn()
  cartId: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  quantity: number;
}
