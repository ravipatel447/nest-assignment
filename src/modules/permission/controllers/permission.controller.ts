import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionsEnum } from 'src/constants';
import { RequirePermissions } from 'src/decorators/requirePermission.decorator';
import { UpdateRolePermissionDto } from '../Dtos';
import { CreatePermissionDto } from '../Dtos/create-permission.dto';
import { PermissionService } from '../services/permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionServie: PermissionService) {}

  @Post()
  @RequirePermissions(PermissionsEnum.Permission, 'create')
  createPermission(@Body() body: CreatePermissionDto) {
    return this.permissionServie.createPermission(body.permissionName);
  }

  @RequirePermissions(PermissionsEnum.Permission, 'read')
  @Get()
  findAllPermissions() {
    return this.permissionServie.findAllPermissions();
  }

  @Put('id')
  @RequirePermissions(PermissionsEnum.Permission, 'update')
  updatePermission(
    @Param('id', ParseIntPipe) pid: number,
    @Body() body: CreatePermissionDto,
  ) {
    return this.permissionServie.updatePermission(pid, body.permissionName);
  }

  @Delete('id')
  @RequirePermissions(PermissionsEnum.Permission, 'delete')
  deletePermission(@Param('id', ParseIntPipe) pid: number) {
    return this.permissionServie.deletePermission(pid);
  }

  @Get('rolePermissions')
  @RequirePermissions(PermissionsEnum.Permission, 'read')
  getAllrolePermission() {
    return this.permissionServie.findAllRolePermission();
  }

  @Patch('rolePermission')
  @RequirePermissions(PermissionsEnum.Permission, 'update')
  updateRolePermission(
    @Body()
    {
      roleId,
      permissionId,
      create,
      read,
      update,
      delete: d,
    }: UpdateRolePermissionDto,
  ) {
    return this.permissionServie.updateRolePermission(roleId, permissionId, {
      create,
      read,
      update,
      delete: d,
    });
  }
}
