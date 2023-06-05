import { IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from 'src/constants';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: RolesEnum;
}
