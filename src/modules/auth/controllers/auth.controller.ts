import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  LoginResponseDto,
  SignUpResponseDto,
} from '../Dtos';
import { Response } from 'express';
import { Public } from 'src/decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({
    description: 'signedUp successfully ',
    type: SignUpResponseDto,
  })
  async signup(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: CreateUserDto,
  ) {
    const res = await this.authService.signUpUser(payload);
    response.cookie('authToken', res.data.token);
    return res;
  }

  @Post('login')
  @ApiOkResponse({
    description: 'loggedIn successfully ',
    type: LoginResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: LoginUserDto,
  ) {
    const res = await this.authService.loginUser(payload);
    response.cookie('authToken', res.data.token);
    return res;
  }
}
