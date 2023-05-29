import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../Dtos/create-user.dto';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  gId = 1;
  Users = new Map<number, UserInterface>();

  createUser(createUserDto: CreateUserDto) {
    this.Users.set(++this.gId, { ...createUserDto, id: this.gId });
  }

  getUser(id: number): UserInterface {
    return this.Users.get(id);
  }

  getUsers(): UserInterface[] {
    return Array.from(this.Users.values());
  }

  updateUser(id: number, updateUserDto: CreateUserDto) {
    this.Users.set(id, { ...updateUserDto, id });
  }

  deleteUser(id: number) {
    this.Users.delete(id);
  }
}
