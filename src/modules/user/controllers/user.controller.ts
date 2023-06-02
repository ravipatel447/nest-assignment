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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getLogedInUserProfile(@GetUser() user: User) {
    return {
      message: userMessages.success.USER_PROFILE_FETCH_SUCCESS,
      data: {
        user,
      },
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(id, payload);
  }
  @Delete(':id')
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
