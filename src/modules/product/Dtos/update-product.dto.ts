import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: 'name of the Product',
    example: 'Pizza',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productName: string;

  @ApiProperty({
    type: Number,
    description: 'price of product',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsOptional()
  productPrice: number;

  @ApiProperty({
    type: String,
    description: 'product Image url',
    example: 'http://unsplash.image.com',
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  productImage: string;
}
