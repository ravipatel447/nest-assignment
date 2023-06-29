import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'first Name of Uers',
    example: 'ravi',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name of Uers',
    example: 'patel',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Phone number(IN) of User must be unique',
    example: '9173080340',
  })
  @IsPhoneNumber('IN')
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Address of User',
    example: 'sorel applewood',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string;

  @ApiProperty({
    type: String,
    description: 'Password of User',
    example: 'xy234$3#125',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(8)
  password: string;
}
