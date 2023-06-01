import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;

  @IsInt()
  @Min(1)
  @Max(1000)
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;
}
