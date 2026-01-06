import type { RoleData, ValidationResult } from '@axonivy/role-editor-protocol';
import { customRenderHook } from 'test-utils';
import { useValidations } from './useValidation';

test('useValidations', () => {
  expect(renderValidations('').result.current).toEqual([]);
  expect(renderValidations('Employee').result.current).toEqual([validations[0]]);
  expect(renderValidations('Teamleader').result.current).toEqual([validations[1], validations[2], validations[3]]);
  expect(renderValidations('Manager').result.current).toEqual([validations[4]]);
  expect(renderValidations('HR Manager').result.current).toEqual([]);
});

const renderValidations = (path: string) => {
  return customRenderHook(() => useValidations(path), { wrapperProps: { appContext: { data, validations } } });
};

const data: Array<RoleData> = [
  { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Teamleader'], parent: '' },
  { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
  { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
  { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
];

const validations: Array<ValidationResult> = [
  { message: 'message0', path: 'Employee', severity: 'INFO' },
  { message: 'message1', path: 'Teamleader', severity: 'INFO' },
  { message: 'message2', path: 'Teamleader', severity: 'WARNING' },
  { message: 'message3', path: 'Teamleader', severity: 'ERROR' },
  { message: 'message4', path: 'Manager', severity: 'INFO' }
];
