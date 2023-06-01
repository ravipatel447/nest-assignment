import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../Dtos';

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
}
