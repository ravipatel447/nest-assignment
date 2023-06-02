import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, RolePermission } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, RolePermission])],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
