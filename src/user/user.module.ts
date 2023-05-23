import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TokenModule } from './token/token.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TokenModule],
})
export class UserModule {}
