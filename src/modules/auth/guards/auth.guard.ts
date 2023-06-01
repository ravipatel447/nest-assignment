import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token, User } from 'src/database/entities';
import { Repository } from 'typeorm';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getClass());
    const isPublicRoute = this.reflector.get('isPublic', context.getHandler());

    if (isPublic || isPublicRoute) return true;

    const request = context.switchToHttp().getRequest();

    const token = request.cookies['authToken'];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const isValid = await this.tokenRepo.findOneBy({
        userId: payload?.userId,
        token,
      });
      if (!isValid) {
        throw new Error('authToken is not valid');
      }
      const user = await this.userRepo.findOneBy({ userId: payload?.userId });
      if (!isValid) {
        throw new Error("User doesn't exist");
      }
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
