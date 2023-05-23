import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(8)
  @IsNotEmpty()
  roleName: string;
}
