import type { RoleData } from '@axonivy/role-editor-protocol';

export const cleanupDeletedRoleReferences = (deletedRoleId: string, data: Array<RoleData>): Array<RoleData> => {
  return data.map(role => {
    const newParent = role.parent === deletedRoleId ? '' : role.parent;
    const newMembers = role.members.filter(memberId => memberId !== deletedRoleId);
    return {
      ...role,
      parent: newParent,
      members: newMembers
    };
  });
};
