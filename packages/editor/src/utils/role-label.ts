import type { RoleData } from '@axonivy/role-editor-protocol';

export const roleLabel = (role: RoleData) => `${role.id}${role.displayName ? ` (${role.displayName})` : ''}`;
