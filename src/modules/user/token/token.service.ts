import { Injectable } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { tokenInterface } from './token.interface';
@Injectable()
export class TokenService {
  tId = 1;
  Tokens = new Map<number, tokenInterface>();
  generateToken(User: UserInterface) {
    this.Tokens.set(++this.tId, {
      userId: User.id,
      token: 'this is generated Token',
    });
  }
}
