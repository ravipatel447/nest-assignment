import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Permission, Role } from './';

@Entity()
export class RolePermission {
  @PrimaryColumn()
  roleId: number;

  @PrimaryColumn()
  permissionId: number;

  @Column()
  create: boolean;

  @Column()
  update: boolean;

  @Column()
  read: boolean;

  @Column()
  delete: boolean;

  @ManyToOne(() => Role, (role) => role.rolePermission, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'roleId',
    referencedColumnName: 'roleId',
  })
  public role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermission, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'permissionId',
    referencedColumnName: 'permissionId',
  })
  public permission: Permission;
}
