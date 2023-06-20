import { ApiProperty } from '@nestjs/swagger';

export class GlobalResponseDto {
  @ApiProperty({
    type: Boolean,
    description: 'success',
    example: true,
  })
  success: true;

  @ApiProperty({
    type: String,
    description: 'message',
    example: 'Process has been completed successfully',
  })
  message: string;

  @ApiProperty({
    type: Object,
    description: 'data',
  })
  data: object;
}
