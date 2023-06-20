import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { orderStatus } from 'src/constants';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'order status',
    enum: orderStatus,
    example: orderStatus.Processing,
  })
  @IsIn(Object.values(orderStatus))
  @IsNotEmpty()
  status: orderStatus;
}
