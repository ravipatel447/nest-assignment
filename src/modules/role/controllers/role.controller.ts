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
import { CreateRoleDto } from '../Dtos/create-role.dto';
import { RoleService } from '../services/role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  findAllPermissions() {
    return this.roleService.findAllRoles();
  }
  @Post()
  createPermission(@Body() body: CreateRoleDto) {
    return this.roleService.createRole(body.roleName);
  }
  @Patch('id')
  updateRoleName(
    @Param('id', ParseIntPipe) rid: number,
    @Body() body: CreateRoleDto,
  ) {
    return this.roleService.updateRole(rid, body.roleName);
  }
  @Delete('id')
  deletePermission(@Param('id', ParseIntPipe) rid: number) {
    return this.roleService.deleteRole(rid);
  }
}
