import type { RoleContext } from './role';

export interface RoleActionArgs {
  actionId: 'openUrl';
  context: RoleContext;
  payload: string;
}
