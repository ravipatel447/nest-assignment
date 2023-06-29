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
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBadRequestResponse({ description: 'bad requeset' })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @RequirePermissions(PermissionsEnum.User, 'read')
  @ApiOkResponse({ description: 'user fetched successfully' })
  getLogedInUserProfile(@GetUser() user: User) {
    return {
      message: userMessages.success.USER_PROFILE_FETCH_SUCCESS,
      data: {
        user,
      },
    };
  }

  @Put('me')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'user updated successfully' })
  @RequirePermissions(PermissionsEnum.User, 'update', 'OWNER')
  updateMyProfile(@GetUser() user: User, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(user.userId, payload);
  }

  @Put(':userId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'user updated successfully' })
  @RequirePermissions(PermissionsEnum.User, 'update')
  updateUser(@Param('userId') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(id, payload);
  }

  @Delete('me')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'user deleted successfully' })
  @RequirePermissions(PermissionsEnum.User, 'delete', 'OWNER')
  deleteMyProfile(@GetUser() user: User) {
    return this.userService.remove(user.userId);
  }

  @Delete(':userId')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'user deleted successfully' })
  @RequirePermissions(PermissionsEnum.User, 'delete')
  deleteUser(@Param('userId') id: number) {
    return this.userService.remove(id);
  }

  @Public()
  @Get(':userId')
  @ApiOkResponse({ description: 'user fetched successfully' })
  async getUserProfile(@Param('userId', ParseIntPipe) id: number) {
    const user = await this.userService.findUserById(id);
    return {
      message: userMessages.success.USER_PROFILE_FETCH_SUCCESS,
      data: {
        user,
      },
    };
  }
}
