import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  permissionName: string;
}
