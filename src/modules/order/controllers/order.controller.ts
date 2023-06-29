import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PermissionsEnum } from 'src/constants';
import { User } from 'src/database/entities';
import { GetUser } from 'src/decorators';
import { RequirePermissions } from 'src/decorators/requirePermission.decorator';
import { CartService } from 'src/modules/cart/services/cart.service';
import { UpdateOrderStatusDto } from '../Dtos/orderStatusUpdate.dto';
import { OrderService } from '../services/order.service';

@ApiTags('Order')
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'bad request' })
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Order created successfully' })
  @RequirePermissions(PermissionsEnum.Order, 'create')
  async placeOrder(@GetUser() user: User) {
    const cart = await this.cartService.getCartIdOfUser(user);
    const cartProducts = await this.cartService.getCartWithProducts(cart);
    return this.orderService.placeOrder(cartProducts.data.cart, user);
  }

  @Get('my')
  @ApiOkResponse({ description: 'orders fetched successfully' })
  @RequirePermissions(PermissionsEnum.Order, 'read', 'OWNER')
  async viewOrders(@GetUser() user: User) {
    return this.orderService.viewOrders(user.userId);
  }

  @Get('user/:userId')
  @ApiOkResponse({ description: 'orders fetched successfully' })
  @RequirePermissions(PermissionsEnum.Order, 'read')
  async viewUsersOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.viewOrders(userId);
  }

  @Patch('my/:orderId/cancel')
  @ApiOkResponse({ description: 'orders canceled successfully' })
  @RequirePermissions(PermissionsEnum.Order, 'update', 'OWNER')
  async cancelMyOrder(
    @GetUser() user: User,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return this.orderService.cancelOrder(orderId, user.userId);
  }

  @Patch('/user/:userId/:orderId/cancel')
  @ApiOkResponse({ description: 'orders canceled successfully' })
  @RequirePermissions(PermissionsEnum.Order, 'update')
  async cancelOrder(
    @GetUser() user: User,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.orderService.cancelOrder(orderId, userId);
  }

  @Patch(':orderId/status')
  @ApiOkResponse({ description: 'orders status updated successfully' })
  @RequirePermissions(PermissionsEnum.Order, 'update')
  async updateStatusOfOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() body: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatusOfOrder(orderId, body.status);
  }
}
