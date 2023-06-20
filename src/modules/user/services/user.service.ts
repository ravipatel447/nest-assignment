import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../database/entities';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../Dtos';
import { userMessages } from 'src/messages';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async updateUser(userId: number, data: UpdateUserDto) {
    const user = await this.findUserById(userId);
    Object.assign(user, data);
    await this.userRepo.save(user);
    return {
      message: userMessages.success.USER_UPDATION_SUCCESS,
      data: { user },
    };
  }

  async remove(userId: number) {
    const user = await this.findUserById(userId);
    await this.userRepo.remove(user);
    return {
      message: userMessages.success.USER_PROFILE_DELETE_SUCCESS,
      data: { user },
    };
  }

  async findUserById(userId: number) {
    const user = await this.userRepo.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(userMessages.error.USER_NOT_FOUND);
    }
    return user;
  }
}
