import type { RoleData, ValidationResult } from '@axonivy/role-editor-protocol';

export const validateMock = (data: Array<RoleData>): Array<ValidationResult> => {
  const validations: Array<ValidationResult> = [];
  data.forEach(role => {
    if (role.id.includes('#')) {
      validations.push({ path: role.id, message: `Role ${role.id} contains invalid characters`, severity: 'ERROR' });
    }
  });
  return validations;
};
