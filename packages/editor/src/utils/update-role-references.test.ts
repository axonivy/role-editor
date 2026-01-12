import type { RoleData } from '@axonivy/role-editor-protocol';
import { updateRoleReferences } from './update-role-references';

const data = (): Array<RoleData> =>
  structuredClone([
    { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Teamleader'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
  ]);

test('deleteRoleReferences', () => {
  expect(updateRoleReferences(data(), '')).toEqual(data());
  expect(updateRoleReferences(data(), 'unknown')).toEqual(data());
  expect(updateRoleReferences(data(), 'Teamleader')).toEqual([
    { id: 'Employee', displayName: 'Employee', members: ['Manager'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
  ]);
  expect(updateRoleReferences(data(), 'Manager')).toEqual([
    { id: 'Employee', displayName: 'Employee', members: ['Teamleader'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: '' }
  ]);
});

test('updateRoleReferences', () => {
  expect(updateRoleReferences(data(), '', 'Test')).toEqual(data());
  expect(updateRoleReferences(data(), 'unknown', 'Test')).toEqual(data());
  expect(updateRoleReferences(data(), 'Teamleader', 'Test')).toEqual([
    { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Test'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
  ]);
  expect(updateRoleReferences(data(), 'Manager', 'Test')).toEqual([
    { id: 'Employee', displayName: 'Employee', members: ['Test', 'Teamleader'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Test' }
  ]);
});
