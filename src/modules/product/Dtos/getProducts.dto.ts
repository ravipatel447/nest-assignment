import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class GetProductsDto {
  @ApiProperty({
    type: Number,
    description: 'page',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((obj) => obj.limit)
  @Type(() => Number)
  page: number;

  @ApiProperty({
    type: Number,
    description: 'limit',
    example: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((obj) => obj.page)
  @Type(() => Number)
  limit: number;
}
