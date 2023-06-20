import { RolesEnum } from 'src/constants';

export const roleSeed = Object.values(RolesEnum).map((role) => ({
  roleName: role,
}));
