import { RolesEnum } from 'src/constants';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Permission, Role, RolePermission, User } from '../entities';
import { roleSeed, permissionSeed, RolePermissionUpdate } from '../seeds';
import * as bcrypt from 'bcrypt';

export class RolePermissionSeed1685941841002 implements MigrationInterface {
  private async bulkInsert(queryRunner: QueryRunner, Entity, EntityData) {
    return queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Entity)
      .values(EntityData)
      .execute();
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();
    await this.bulkInsert(queryRunner, Role, roleSeed);
    await this.bulkInsert(queryRunner, Permission, permissionSeed);
    const permissions: Permission[] = await queryRunner.query(
      'select * from permission',
    );
    const roles: Role[] = await queryRunner.query('select * from role');
    const rolePermissions = roles
      .map((role) => {
        return permissions.map((permission) => {
          return { roleId: role.roleId, permissionId: permission.permissionId };
        });
      })
      .flat(1);
    await this.bulkInsert(queryRunner, RolePermission, rolePermissions);
    await Promise.all(RolePermissionUpdate.map((q) => queryRunner.query(q)));
    const passwordHash = await bcrypt.hash(process.env['ADMIN_PASSWORD'], 8);
    await queryRunner.manager.insert(User, {
      firstName: process.env['ADMIN_FIRSTNAME'],
      lastName: process.env['ADMIN_LASTNAME'],
      email: process.env['ADMIN_EMAIL'],
      phone: process.env['ADMIN_PHONE'],
      password: passwordHash,
      roleId: roles.find((role) => role.roleName === RolesEnum.ADMIN).roleId,
      address: process.env['ADMIN_ADDRESS'],
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop database ' + process.env['DATABASE_NAME']);
    await queryRunner.query('create database ' + process.env['DATABASE_NAME']);
  }
}
