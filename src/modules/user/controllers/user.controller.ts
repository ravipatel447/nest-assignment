import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../Dtos';
import { GetUser } from 'src/decorators';
import { User } from 'src/database/entities';
import { userMessages } from 'src/messages';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.updateUser(id, payload);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
  @Get('me')
  getUserProfile(@GetUser() user: User) {
    return {
      message: userMessages.success.USER_PROFILE_FETCH_SUCCESS,
      data: {
        user,
      },
    };
  }
}
