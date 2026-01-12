import type { RoleData } from '@axonivy/role-editor-protocol';

export const updateRoleReferences = (data: Array<RoleData>, oldRoleId: string, newRoleId = ''): Array<RoleData> => {
  if (oldRoleId === '') {
    return data;
  }
  return data.map(role => {
    const newParent = role.parent === oldRoleId ? newRoleId : role.parent;
    const newMembers = role.members.map(memberId => (memberId === oldRoleId ? newRoleId : memberId)).filter(memberId => memberId !== '');
    return {
      ...role,
      parent: newParent,
      members: newMembers
    };
  });
};
