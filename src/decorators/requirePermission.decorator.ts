import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from 'src/constants';

export const RequirePermissions = (
  permission: PermissionsEnum,
  permissionType: 'create' | 'read' | 'update' | 'delete',
  allowIfOwner: 'OWNER' | 'NOTOWNER' = 'NOTOWNER',
) => {
  return SetMetadata('askPermission', {
    permission,
    permissionType,
    allowIfOwner,
  });
};
