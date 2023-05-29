import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productPrice: number;

  @IsUrl()
  @IsNotEmpty()
  productImage: string;
}
