import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class GetProductsDto {
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((obj) => obj.limit)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((obj) => obj.page)
  @Type(() => Number)
  limit: number;
}
