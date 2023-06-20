import { PermissionsEnum } from 'src/constants';

export const permissionSeed = Object.values(PermissionsEnum).map(
  (permission) => ({
    permissionName: permission,
  }),
);
