import type { RoleData } from '@axonivy/role-editor-protocol';
import { customRenderHook } from 'test-utils';
import { useValidateName } from './useValidateName';

const data: Array<RoleData> = [
  { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Teamleader'], parent: '' },
  { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
  { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
  { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
];

const validate = (name: string) => {
  const { result } = customRenderHook(() => useValidateName(name, data));
  return result.current;
};

test('validate', () => {
  expect(validate('Name')).toBeUndefined();
  const emptyError = { message: 'Name cannot be empty.', variant: 'error' };
  expect(validate('')).toEqual(emptyError);
  expect(validate('   ')).toEqual(emptyError);
  const alreadyExistError = { message: 'Role already exists.', variant: 'error' };
  expect(validate('Employee')).toEqual(alreadyExistError);
  expect(validate('Teamleader    ')).toEqual(alreadyExistError);
});
