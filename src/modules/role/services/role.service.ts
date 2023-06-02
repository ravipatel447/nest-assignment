import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum } from 'src/constants';
import { Role } from 'src/database/entities';
import { roleMessages } from 'src/messages';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}
  async createRole(roleName: RolesEnum) {
    const check = this.roleRepo.findOneBy({ roleName });
    if (check)
      throw new BadRequestException(roleMessages.error.ROLE_ALLREADY_EXIST);
    const role = this.roleRepo.create({ roleName });
    await this.roleRepo.save(role);
    return {
      message: roleMessages.success.ROLE_CREATE_SUCCESS,
      data: {
        role,
      },
    };
  }

  async updateRole(roleId: number, roleName: RolesEnum) {
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

  async findRoleByIdWithFilters(roleId: number, filters?: Partial<Role>) {
    const role = await this.roleRepo.findOneBy({
      roleId,
      ...filters,
    });
    if (role) {
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
