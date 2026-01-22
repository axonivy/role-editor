import type { RoleData } from '@axonivy/role-editor-protocol';

export const roleLabel = (role: Pick<RoleData, 'id' | 'displayName'>) => `${role.id}${role.displayName ? ` (${role.displayName})` : ''}`;
