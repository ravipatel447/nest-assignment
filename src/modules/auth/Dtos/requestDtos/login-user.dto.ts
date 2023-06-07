import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of User',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password of User',
    example: 'xy234$3#125',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
