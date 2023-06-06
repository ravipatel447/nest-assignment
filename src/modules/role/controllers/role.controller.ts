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
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionsEnum } from 'src/constants';
import { RequirePermissions } from 'src/decorators/requirePermission.decorator';
import { CreateRoleDto, UpdateUserRoleDto } from '../Dtos';
import { RoleService } from '../services/role.service';

@ApiTags('Role')
@Controller('role')
@ApiBadRequestResponse({ description: 'Bad Request' })
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @ApiAcceptedResponse({ description: 'roles fetch successfully' })
  @RequirePermissions(PermissionsEnum.Role, 'read')
  findAllRoles() {
    return this.roleService.findAllRoles();
  }

  @Post()
  @ApiCreatedResponse({ description: 'roles created successfully' })
  @RequirePermissions(PermissionsEnum.Role, 'create')
  createRole(@Body() body: CreateRoleDto) {
    return this.roleService.createRole(body.roleName);
  }

  @Patch('user')
  @ApiAcceptedResponse({
    description: `user's role has been changed successfully`,
  })
  @RequirePermissions(PermissionsEnum.Role, 'update')
  updateRoleOfUser(@Body() body: UpdateUserRoleDto) {
    return this.roleService.changeRoleOfUser(body.userId, body.roleId);
  }

  @Put(':roleId')
  @ApiAcceptedResponse({
    description: `roleName has been updated successfully`,
  })
  @RequirePermissions(PermissionsEnum.Role, 'update')
  updateRoleName(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() body: CreateRoleDto,
  ) {
    return this.roleService.updateRoleName(roleId, body.roleName);
  }

  @Delete(':roleId')
  @ApiAcceptedResponse({
    description: `roleName has been deleted successfully`,
  })
  @RequirePermissions(PermissionsEnum.Role, 'delete')
  deleteRole(@Param('roleId', ParseIntPipe) rid: number) {
    return this.roleService.deleteRole(rid);
  }
}
