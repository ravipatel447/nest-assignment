import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, RolePermission } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, RolePermission, Role])],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
