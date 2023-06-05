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
import { CreateRoleDto, UpdateUserRoleDto } from '../Dtos';
import { RoleService } from '../services/role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @RequirePermissions(PermissionsEnum.Role, 'read')
  findAllPermissions() {
    return this.roleService.findAllRoles();
  }

  @Post()
  @RequirePermissions(PermissionsEnum.Role, 'create')
  createPermission(@Body() body: CreateRoleDto) {
    return this.roleService.createRole(body.roleName);
  }

  @Patch('user')
  @RequirePermissions(PermissionsEnum.Role, 'update')
  updateRoleOfUser(@Body() body: UpdateUserRoleDto) {
    return this.roleService.changeRoleOfUser(body.userId, body.roleId);
  }

  @Put('id')
  @RequirePermissions(PermissionsEnum.Role, 'update')
  updateRoleName(
    @Param('id', ParseIntPipe) rid: number,
    @Body() body: CreateRoleDto,
  ) {
    return this.roleService.updateRoleName(rid, body.roleName);
  }

  @Delete('id')
  @RequirePermissions(PermissionsEnum.Role, 'delete')
  deletePermission(@Param('id', ParseIntPipe) rid: number) {
    return this.roleService.deleteRole(rid);
  }
}
