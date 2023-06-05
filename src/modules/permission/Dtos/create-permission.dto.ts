import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PermissionsEnum } from 'src/constants';

export class CreatePermissionDto {
  @ApiProperty({
    type: String,
    description: 'name of the Role',
    example: 'Manager',
  })
  @IsString()
  @IsNotEmpty()
  permissionName: PermissionsEnum;
}
