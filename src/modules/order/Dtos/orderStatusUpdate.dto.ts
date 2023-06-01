import { IsIn, IsNotEmpty } from 'class-validator';
import { orderStatus } from 'src/constants';

export class UpdateOrderStatusDto {
  @IsIn(Object.values(orderStatus))
  @IsNotEmpty()
  status: orderStatus;
}
