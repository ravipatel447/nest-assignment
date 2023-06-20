import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'name of the Product',
    example: 'Pizza',
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    type: Number,
    description: 'price of product',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productPrice: number;

  @ApiProperty({
    type: String,
    description: 'product Image url',
    example: 'http://unsplash.image.com',
  })
  @IsUrl()
  @IsNotEmpty()
  productImage: string;
}
