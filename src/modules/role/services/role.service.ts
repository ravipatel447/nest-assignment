import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum } from 'src/constants';
import { Permission, Role, RolePermission, User } from 'src/database/entities';
import { roleMessages, userMessages } from 'src/messages';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepo: Repository<RolePermission>,
  ) {}
  async createRole(roleName: RolesEnum) {
    const check = await this.roleRepo.findOneBy({ roleName });
    if (check)
      throw new BadRequestException(roleMessages.error.ROLE_ALLREADY_EXIST);
    const role = this.roleRepo.create({ roleName });
    await this.roleRepo.save(role);
    const allPermissions = await this.permissionRepo.find({});
    await Promise.all(
      allPermissions.map((permission) => {
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
      message: roleMessages.success.ROLE_CREATE_SUCCESS,
      data: {
        role,
      },
    };
  }

  async updateRoleName(roleId: number, roleName: RolesEnum) {
    const role = await this.findRoleByIdWithFilters(roleId);
    role.roleName = roleName;
    await this.roleRepo.save(role);
    return {
      message: roleMessages.success.ROLE_UPDATION_SUCCESS,
      data: {
        role,
      },
    };
  }
  async deleteRole(roleId: number) {
    const role = await this.findRoleByIdWithFilters(roleId);
    await this.roleRepo.remove(role);
    return {
      message: roleMessages.success.ROLE_DELETE_SUCCESS,
      data: {
        role,
      },
    };
  }

  async changeRoleOfUser(userId: number, updatedRoleId: number) {
    const user = await this.userRepo.findOneBy({ userId });
    if (!user) throw new BadRequestException(userMessages.error.USER_NOT_FOUND);
    const role = await this.findRoleByIdWithFilters(updatedRoleId);
    user.role = role;
    await this.userRepo.save(user);
    return {
      message: roleMessages.success.USER_ROLE_UPDATION_SUCCESS,
      data: {
        user,
      },
    };
  }

  async findRoleByIdWithFilters(roleId: number, filters?: Partial<Role>) {
    const role = await this.roleRepo.findOneBy({
      roleId,
      ...filters,
    });
    if (!role) {
      throw new BadRequestException(roleMessages.error.ROLE_NOT_FOUND);
    }
    return role;
  }

  async findAllRoles() {
    const roles = await this.roleRepo.find({});
    return {
      message: roleMessages.success.ROLES_FETCH_SUCCESS,
      data: {
        roles,
      },
    };
  }
}
