import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
