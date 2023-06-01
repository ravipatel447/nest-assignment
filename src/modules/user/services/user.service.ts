import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../database/entities';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../Dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async updateUser(userId: number, data: UpdateUserDto) {
    const user = await this.findUserById(userId);
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async remove(userId: number) {
    const user = await this.findUserById(userId);
    return this.userRepo.remove(user);
  }

  async findUserById(userId: number) {
    const user = await this.userRepo.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }
  // getUser(id: number): UserInterface {}

  // getUsers(): UserInterface[] {}

  // updateUser(id: number, updateUserDto: CreateUserDto) {}

  // deleteUser(id: number) {}
}
