import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, RolePermission, User } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, RolePermission, User])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
