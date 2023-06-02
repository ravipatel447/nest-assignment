import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RolePermission } from './';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  permissionId: number;

  @Column()
  permissionName: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermission: RolePermission[];
}
