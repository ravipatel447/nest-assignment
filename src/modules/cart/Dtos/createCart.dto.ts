import { ArrayMinSize, ValidateNested } from 'class-validator';
import { CreateCartItemDto } from './createCartItem.dto';

export class CreateCartDto {
  @ValidateNested()
  @ArrayMinSize(0)
  cartItems: CreateCartItemDto[];
}
