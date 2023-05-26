import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';

@Module({
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
