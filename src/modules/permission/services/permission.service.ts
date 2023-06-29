import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsEnum } from 'src/constants';
import { Permission, Role, RolePermission } from 'src/database/entities';
import { permissionMessages } from 'src/messages';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
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
    const allRoles = await this.roleRepo.find({});
    await Promise.all(
      allRoles.map((role) => {
        const rolePermission = this.rolePermissionRepo.create({
          permission,
          role,
          create: false,
          read: false,
          update: false,
          delete: false,
        });
        return this.rolePermissionRepo.save(rolePermission);
      }),
    );
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

  async findAllRolePermission() {
    const rolePermissions = await this.rolePermissionRepo.find({
      relations: {
        permission: true,
        role: true,
      },
    });
    return {
      message: permissionMessages.success.ROLE_PERMISSIONS_FETCH_SUCCESS,
      data: {
        rolePermissions,
      },
    };
  }

  async updateRolePermission(roleId: number, permissionId: number, payload) {
    const rolePermission = await this.rolePermissionRepo.findOneBy({
      roleId,
      permissionId,
    });
    if (!rolePermission)
      throw new BadRequestException(
        permissionMessages.error.ROLE_PERMISSION_NOT_FOUND,
      );
    Object.assign(rolePermission, payload);
    await this.rolePermissionRepo.save(rolePermission);
    return {
      message: permissionMessages.success.ROLE_PERMISSION_UPDATION_SUCCESS,
      data: {
        rolePermission,
      },
    };
  }
}
