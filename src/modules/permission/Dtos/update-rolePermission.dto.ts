import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateRolePermissionDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  permissionId: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  roleId: number;

  @IsBoolean()
  @IsOptional()
  create: boolean;

  @IsBoolean()
  @IsOptional()
  read: boolean;

  @IsBoolean()
  @IsOptional()
  update: boolean;

  @IsBoolean()
  @IsOptional()
  delete: boolean;
}
