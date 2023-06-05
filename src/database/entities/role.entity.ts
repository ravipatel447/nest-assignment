import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RolePermission, User } from './';
import { Token } from './token.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ unique: true })
  roleName: string;

  @OneToMany(() => Token, (token) => token.user)
  users: User[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermission: RolePermission[];
}
