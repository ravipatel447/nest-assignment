import { IsNotEmpty, IsString } from 'class-validator';
import { PermissionsEnum } from 'src/constants';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  permissionName: PermissionsEnum;
}
