import type { RoleData } from '@axonivy/role-editor-protocol';
import { customRenderHook } from 'test-utils';
import { useValidateAddRole } from './useValidateAddRole';

const data: Array<RoleData> = [
  { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Teamleader'], parent: '' },
  { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
  { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
  { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
];

const validate = (name: string) => {
  const { result } = customRenderHook(() => useValidateAddRole(name, data));
  return result.current;
};

test('validate', () => {
  expect(validate('Name').nameValidationMessage).toBeUndefined();
  const emptyError = { message: 'Name cannot be empty.', variant: 'error' };
  expect(validate('').nameValidationMessage).toEqual(emptyError);
  expect(validate('   ').nameValidationMessage).toEqual(emptyError);
  const alreadyExistError = { message: 'Role already exists.', variant: 'error' };
  expect(validate('Employee').nameValidationMessage).toEqual(alreadyExistError);
  expect(validate('Teamleader    ').nameValidationMessage).toEqual(alreadyExistError);
  const charNotAllowedError = { message: "Character '.' is not allowed.", variant: 'error' };
  expect(validate('New.Name').nameValidationMessage).toEqual(charNotAllowedError);
});
