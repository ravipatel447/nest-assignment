import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../Dtos';
import { GetUser, Public } from 'src/decorators';
import { User } from 'src/database/entities';
import { userMessages } from 'src/messages';
import { RequirePermissions } from 'src/decorators/requirePermission.decorator';
import { PermissionsEnum } from 'src/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @RequirePermissions(PermissionsEnum.User, 'read')
  getLogedInUserProfile(@GetUser() user: User) {
    return {
      message: userMessages.success.USER_PROFILE_FETCH_SUCCESS,
      data: {
        user,
      },
    };
  }

  @Put('me')
  @RequirePermissions(PermissionsEnum.User, 'update', 'OWNER')
  updateMyProfile(@GetUser() user: User, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(user.userId, payload);
  }

  @Put(':id')
  @RequirePermissions(PermissionsEnum.User, 'update')
  updateUser(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(id, payload);
  }

  @Delete('me')
  @RequirePermissions(PermissionsEnum.User, 'delete', 'OWNER')
  deleteMyProfile(@GetUser() user: User) {
    return this.userService.remove(user.userId);
  }

  @Delete(':id')
  @RequirePermissions(PermissionsEnum.User, 'delete')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Public()
  @Get(':id')
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findUserById(id);
    return {
      message: userMessages.success.USER_PROFILE_FETCH_SUCCESS,
      data: {
        user,
      },
    };
  }
}
