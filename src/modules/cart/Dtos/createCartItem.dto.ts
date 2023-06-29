import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    type: Number,
    description: 'ProductId of product',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;

  @ApiProperty({
    type: Number,
    description: 'quentity of product',
    example: 3,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;
}
