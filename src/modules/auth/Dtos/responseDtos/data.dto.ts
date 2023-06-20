import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { UserDto } from './user.dto';

export class dataDto {
  @ApiProperty({
    type: UserDto,
  })
  @ValidateNested()
  user: UserDto;

  @ApiProperty({
    type: String,
    description: 'token of User',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4NjExODE1NSwiZXhwIjoxNjg2NzIyOTU1fQ.F10UcTdFthcDiWNhXGCy3nvlSavluuGebYo_s8CEJfs',
  })
  @IsString()
  token: string;
}
