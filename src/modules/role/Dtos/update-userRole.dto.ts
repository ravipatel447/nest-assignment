import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateUserRoleDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  roleId: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;
}
