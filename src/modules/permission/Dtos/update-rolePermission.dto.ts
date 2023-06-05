import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateRolePermissionDto {
  @ApiProperty({
    type: Number,
    description: 'permissionId',
    example: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  permissionId: number;

  @ApiProperty({
    type: Number,
    description: 'roleId',
    example: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    type: Boolean,
    description: 'can create',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  create: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'can read',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  read: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'can update',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  update: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'can delte',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  delete: boolean;
}
