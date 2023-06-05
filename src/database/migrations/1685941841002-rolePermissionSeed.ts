import { RolesEnum } from 'src/constants';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Permission, Role, RolePermission, User } from '../entities';
import { roleSeed, permissionSeed, RolePermissionUpdate } from '../seeds';

export class RolePermissionSeed1685941841002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await Promise.all(
      roleSeed.map((role) => {
        return queryRunner.manager.insert(Role, role);
      }),
    );
    await Promise.all(
      permissionSeed.map((permission) => {
        return queryRunner.manager.insert(Permission, permission);
      }),
    );
    const permissions: Permission[] = await queryRunner.query(
      'select * from permission',
    );
    const roles: Role[] = await queryRunner.query('select * from role');
    await Promise.all(
      roles.map(async (role) => {
        return Promise.all(
          permissions.map(async (permission) => {
            return queryRunner.manager.insert(RolePermission, {
              roleId: role.roleId,
              permissionId: permission.permissionId,
              create: false,
              update: false,
              read: false,
              delete: false,
            });
          }),
        );
      }),
    );
    await Promise.all(RolePermissionUpdate.map((q) => queryRunner.query(q)));
    await queryRunner.manager.insert(User, {
      firstName: process.env['ADMIN_FIRSTNAME'],
      lastName: process.env['ADMIN_LASTNAME'],
      email: process.env['ADMIN_EMAIL'],
      phone: process.env['ADMIN_PHONE'],
      password: process.env['ADMIN_PASSWORD'],
      roleId: roles.find((role) => role.roleName === RolesEnum.ADMIN).roleId,
      address: process.env['ADMIN_ADDRESS'],
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop database ' + process.env['DATABASE_NAME']);
    await queryRunner.query('create database ' + process.env['DATABASE_NAME']);
  }
}
