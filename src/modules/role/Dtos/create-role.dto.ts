import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from 'src/constants';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    description: 'name of the Role',
    example: 'Manager',
  })
  @IsString()
  @IsNotEmpty()
  roleName: RolesEnum;
}
