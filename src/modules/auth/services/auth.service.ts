import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, Role, Token, User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from '../Dtos';
import { JwtService } from '@nestjs/jwt';
import { authMessages } from 'src/messages';
import { RolesEnum } from 'src/constants';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async signUpUser(data: CreateUserDto) {
    const { email, phone } = data;

    const isEmailExist = await this.userRepo.findOneBy({ email });
    if (isEmailExist)
      throw new BadRequestException(authMessages.error.EMAIL_EXIST);

    const isPhoneExist = await this.userRepo.findOneBy({ phone });
    if (isPhoneExist)
      throw new BadRequestException(authMessages.error.PHONE_EXITST);

    const userRole = await this.roleRepo.findOneBy({
      roleName: RolesEnum.USER,
    });
    const user = this.userRepo.create(data);
    user.role = userRole;
    await this.userRepo.save(user);

    const cart = this.cartRepo.create({ customer: user });
    await this.cartRepo.save(cart);

    const token = await this.generateAuthToken(user);
    return {
      message: authMessages.success.USER_REGISTER_SUCCESS,
      data: {
        user,
        token,
      },
    };
  }

  async loginUser(data: LoginUserDto) {
    const { email, password } = data;

    const user = await this.userRepo.findOneBy({ email });
    if (!user)
      throw new BadRequestException(authMessages.error.USER_LOGIN_FAILED);

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      throw new BadRequestException(authMessages.error.USER_LOGIN_FAILED);

    const token = await this.generateAuthToken(user);
    return {
      message: authMessages.success.USER_LOGIN_SUCCESS,
      data: {
        user,
        token,
      },
    };
  }

  async generateAuthToken(user: User) {
    const jwtToken = await this.jwtService.signAsync({ userId: user.userId });

    const token = this.tokenRepo.create({
      token: jwtToken,
      user,
    });
    await this.tokenRepo.save(token);

    return token.token;
  }
}
