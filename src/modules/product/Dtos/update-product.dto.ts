import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @IsOptional()
  productPrice: number;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  productImage: string;
}
