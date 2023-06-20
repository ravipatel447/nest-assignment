import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: Number,
    description: 'userId of User',
    example: 1,
  })
  @IsNumber()
  userId: number;

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
    type: Number,
    description: 'roleId of User',
    example: 2,
  })
  @IsNumber()
  roleId: number;
}
