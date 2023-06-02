import { IsIn } from 'class-validator';
import { PermissionsEnum } from 'src/constants';

export class CreatePermissionDto {
  @IsIn(Object.values(PermissionsEnum))
  permissionName: PermissionsEnum;
}
