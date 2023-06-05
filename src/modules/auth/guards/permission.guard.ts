import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission, RolePermission, User } from 'src/database/entities';
import { Repository } from 'typeorm';

export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(RolePermission)
    private rolePermissionRepo: Repository<RolePermission>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getClass());
    const isPublicRoute = this.reflector.get('isPublic', context.getHandler());

    if (isPublic || isPublicRoute) return true;
    const askPermission = this.reflector.get(
      'askPermission',
      context.getHandler(),
    );

    if (!askPermission)
      throw new BadRequestException(
        'Permission has not been declared in Route',
      );

    if (askPermission.allowIfOwner === 'OWNER') return true;

    const request = context.switchToHttp().getRequest();

    const user: User = request['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    try {
      const { permissionId } = await this.permissionRepo.findOneBy({
        permissionName: askPermission.permission,
      });
      const checkPermission = await this.rolePermissionRepo.findOneBy({
        permissionId,
        roleId: user.roleId,
      });
      if (!checkPermission[askPermission.permissionType]) {
        throw new BadRequestException(
          `You don't have permission to Perform this task`,
        );
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
