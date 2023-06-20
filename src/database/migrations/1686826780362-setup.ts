import { RolesEnum } from 'src/constants';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Permission, Role, RolePermission, User } from '../entities';
import { roleSeed, permissionSeed, RolePermissionUpdate } from '../seeds';
import * as bcrypt from 'bcrypt';
export class Setup1686826780362 implements MigrationInterface {
  name = 'Setup1686826780362';
  private async bulkInsert(queryRunner: QueryRunner, Entity, EntityData) {
    return queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Entity)
      .values(EntityData)
      .execute();
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`token\` (\`token\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`roleId\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` (\`roleName\`), PRIMARY KEY (\`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roleId\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`productId\` int NOT NULL AUTO_INCREMENT, \`productName\` varchar(255) NOT NULL, \`productPrice\` int NOT NULL, \`productImage\` varchar(255) NOT NULL, \`sellerId\` int NOT NULL, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`productId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`orderId\` int NOT NULL AUTO_INCREMENT, \`orderDate\` date NOT NULL, \`status\` enum ('Pending', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Canceled') NOT NULL DEFAULT 'Processing', \`shippingAddress\` varchar(255) NOT NULL, \`customerId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`orderId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orderDetails\` (\`productId\` int NOT NULL, \`orderId\` int NOT NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`productName\` varchar(255) NOT NULL, PRIMARY KEY (\`productId\`, \`orderId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cart\` (\`cartId\` int NOT NULL AUTO_INCREMENT, \`customerId\` int NOT NULL, UNIQUE INDEX \`REL_eac3d1f269ffeb0999fbde0185\` (\`customerId\`), PRIMARY KEY (\`cartId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cartItem\` (\`cartId\` int NOT NULL, \`productId\` int NOT NULL, \`quantity\` int NOT NULL, PRIMARY KEY (\`cartId\`, \`productId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`permissionId\` int NOT NULL AUTO_INCREMENT, \`permissionName\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_d89e1dadfa403bfefa4d49f7ec\` (\`permissionName\`), PRIMARY KEY (\`permissionId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_permission\` (\`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, \`create\` tinyint NOT NULL DEFAULT 0, \`update\` tinyint NOT NULL DEFAULT 0, \`read\` tinyint NOT NULL DEFAULT 0, \`delete\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`token\` ADD CONSTRAINT \`FK_94f168faad896c0786646fa3d4a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`roleId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_d5cac481d22dacaf4d53f900a3f\` FOREIGN KEY (\`sellerId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orderDetails\` ADD CONSTRAINT \`FK_bb1ea956e38abca70b9a0d2c649\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orderDetails\` ADD CONSTRAINT \`FK_9e18b4f98cc143fbe1865dc5162\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` ADD CONSTRAINT \`cartUser\` FOREIGN KEY (\`customerId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cartItem\` ADD CONSTRAINT \`cartItem\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`cartId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cartItem\` ADD CONSTRAINT \`productItem\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`productId\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3130a39c1e4a740d044e685730\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`roleId\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_72e80be86cab0e93e67ed1a7a9a\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`permissionId\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
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
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_72e80be86cab0e93e67ed1a7a9a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3130a39c1e4a740d044e685730\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cartItem\` DROP FOREIGN KEY \`productItem\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cartItem\` DROP FOREIGN KEY \`cartItem\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart\` DROP FOREIGN KEY \`cartUser\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orderDetails\` DROP FOREIGN KEY \`FK_9e18b4f98cc143fbe1865dc5162\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orderDetails\` DROP FOREIGN KEY \`FK_bb1ea956e38abca70b9a0d2c649\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_d5cac481d22dacaf4d53f900a3f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_94f168faad896c0786646fa3d4a\``,
    );
    await queryRunner.query(`DROP TABLE \`role_permission\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d89e1dadfa403bfefa4d49f7ec\` ON \`permission\``,
    );
    await queryRunner.query(`DROP TABLE \`permission\``);
    await queryRunner.query(`DROP TABLE \`cartItem\``);
    await queryRunner.query(
      `DROP INDEX \`REL_eac3d1f269ffeb0999fbde0185\` ON \`cart\``,
    );
    await queryRunner.query(`DROP TABLE \`cart\``);
    await queryRunner.query(`DROP TABLE \`orderDetails\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(`DROP TABLE \`token\``);
  }
}
