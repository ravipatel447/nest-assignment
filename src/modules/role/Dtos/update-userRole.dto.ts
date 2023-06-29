import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateUserRoleDto {
  @ApiProperty({
    type: Number,
    description: 'roleId',
    example: '1',
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  roleId: number;

  @ApiProperty({
    type: Number,
    description: 'userId',
    example: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;
}
