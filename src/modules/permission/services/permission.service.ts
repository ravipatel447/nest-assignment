import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsEnum } from 'src/constants';
import { Permission, RolePermission } from 'src/database/entities';
import { permissionMessages } from 'src/messages';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepo: Repository<RolePermission>,
  ) {}

  async createPermission(permissionName: PermissionsEnum) {
    const check = this.permissionRepo.findOneBy({ permissionName });
    if (check)
      throw new BadRequestException(
        permissionMessages.error.PERMISSION_ALLREADY_EXIST,
      );
    const permission = this.permissionRepo.create({ permissionName });
    await this.permissionRepo.save(permission);
    return {
      message: permissionMessages.success.PERMISSION_CREATE_SUCCESS,
      data: {
        permission,
      },
    };
  }

  async updatePermission(
    permissionId: number,
    permissionName: PermissionsEnum,
  ) {
    const permission = await this.findPermissionByIdWithFilters(permissionId);
    permission.permissionName = permissionName;
    await this.permissionRepo.save(permission);
    return {
      message: permissionMessages.success.PERMISSION_UPDATION_SUCCESS,
      data: {
        permission,
      },
    };
  }
  async deletePermission(permissionId: number) {
    const permission = await this.findPermissionByIdWithFilters(permissionId);
    await this.permissionRepo.remove(permission);
    return {
      message: permissionMessages.success.PERMISSION_DELETE_SUCCESS,
      data: {
        permission,
      },
    };
  }

  async findPermissionByIdWithFilters(
    permissionId: number,
    filters?: Partial<Permission>,
  ) {
    const permission = await this.permissionRepo.findOneBy({
      permissionId,
      ...filters,
    });
    if (permission) {
      throw new BadRequestException(
        permissionMessages.error.PERMISSION_NOT_FOUND,
      );
    }
    return permission;
  }

  async findAllPermissions() {
    const permissions = await this.permissionRepo.find({});
    return {
      message: permissionMessages.success.PERMISSIONS_FETCH_SUCCESS,
      data: {
        permissions,
      },
    };
  }
}
