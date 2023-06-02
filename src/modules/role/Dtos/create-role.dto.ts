import { IsIn } from 'class-validator';
import { RolesEnum } from 'src/constants';

export class CreateRoleDto {
  @IsIn(Object.values(RolesEnum))
  roleName: RolesEnum;
}
