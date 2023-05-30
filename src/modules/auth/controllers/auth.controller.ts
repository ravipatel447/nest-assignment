import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto, LoginUserDto } from '../Dtos';
import { Response } from 'express';
import { Public } from 'src/decorators';

@Public()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: CreateUserDto,
  ) {
    const { token, user } = await this.authService.signUpUser(payload);
    response.cookie('authToken', token);
    return { user, token };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: LoginUserDto,
  ) {
    const { token, user } = await this.authService.loginUser(payload);
    response.cookie('authToken', token);
    return { user, token };
  }
}
