import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'first Name of Uers',
    example: 'ravi',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name of Uers',
    example: 'patel',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Email of User must be unique',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Phone number(IN) of User must be unique',
    example: '9173080340',
  })
  @IsPhoneNumber('IN')
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Address of User',
    example: 'sorel applewood',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: String,
    description: 'Password of User',
    example: 'xy234$3#125',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
