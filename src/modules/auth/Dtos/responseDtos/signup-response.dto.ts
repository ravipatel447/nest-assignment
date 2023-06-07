import { ApiProperty } from '@nestjs/swagger';
import { GlobalResponseDto } from 'src/core/interceptors/response.dto';
import { authMessages } from 'src/messages';
import { dataDto } from './data.dto';

export class SignUpResponseDto extends GlobalResponseDto {
  constructor() {
    super();
  }
  @ApiProperty({
    type: String,
    description: 'message',
    example: authMessages.success.USER_REGISTER_SUCCESS,
  })
  message: string;

  @ApiProperty({ type: dataDto })
  data: dataDto;
}
