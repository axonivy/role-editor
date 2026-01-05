import type { RoleData, ValidationResult } from '@axonivy/role-editor-protocol';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validateMock = (data: RoleData): Array<ValidationResult> => {
  const validations: Array<ValidationResult> = [];
  validations.push({ path: 'Input-1', message: 'Global warning', severity: 'WARNING' });
  return validations;
};
