import type { RoleData } from '@axonivy/role-editor-protocol';
import { cleanupDeletedRoleReferences } from './cleanup-deleted-role-references';

const data = (): Array<RoleData> =>
  structuredClone([
    { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Teamleader'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
  ]);

test('cleanupDeletedRoleReferences', () => {
  expect(cleanupDeletedRoleReferences('', data())).toEqual(data());
  expect(cleanupDeletedRoleReferences('unknown', data())).toEqual(data());
  expect(cleanupDeletedRoleReferences('Teamleader', data())).toEqual([
    { id: 'Employee', displayName: 'Employee', members: ['Manager'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
  ]);
  expect(cleanupDeletedRoleReferences('Manager', data())).toEqual([
    { id: 'Employee', displayName: 'Employee', members: ['Teamleader'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: '' }
  ]);
});
