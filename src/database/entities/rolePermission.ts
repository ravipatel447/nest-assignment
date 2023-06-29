import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Permission, Role } from './';

@Entity()
export class RolePermission {
  @PrimaryColumn()
  roleId: number;

  @PrimaryColumn()
  permissionId: number;

  @Column({ default: false })
  create: boolean;

  @Column({ default: false })
  update: boolean;

  @Column({ default: false })
  read: boolean;

  @Column({ default: false })
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
