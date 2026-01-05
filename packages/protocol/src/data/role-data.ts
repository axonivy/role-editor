import type { RoleData, RoleSaveDataArgs } from './role';

export type RoleSaveData = Omit<RoleSaveDataArgs, 'data'> & {
  data: RoleData;
  directSave?: boolean;
};
