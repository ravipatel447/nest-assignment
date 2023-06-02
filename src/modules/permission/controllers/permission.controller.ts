import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePermissionDto } from '../Dtos/create-permission.dto';
import { PermissionService } from '../services/permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionServie: PermissionService) {}
  @Post()
  createPermission(@Body() body: CreatePermissionDto) {
    return this.permissionServie.createPermission(body.permissionName);
  }
  @Get()
  findAllPermissions() {
    return this.permissionServie.findAllPermissions();
  }
  @Patch('id')
  updatePermission(
    @Param('id', ParseIntPipe) pid: number,
    @Body() body: CreatePermissionDto,
  ) {
    return this.permissionServie.updatePermission(pid, body.permissionName);
  }
  @Delete('id')
  deletePermission(@Param('id', ParseIntPipe) pid: number) {
    return this.permissionServie.deletePermission(pid);
  }
}
