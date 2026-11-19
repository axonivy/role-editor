import type { RoleData, ValidationResult } from '@axonivy/role-editor-protocol';

export const validateMock = (data: Array<RoleData>): Array<ValidationResult> => {
  const validations: Array<ValidationResult> = [];
  data.forEach(role => {
    if (role.id.includes('#')) {
      validations.push({
        path: `${role.id}.id`,
        message: `Role ${role.id} contains invalid characters`,
        severity: 'ERROR',
        code: 'INVALID_ROLE_ID',
        url: 'https://dev.axonivy.com/roles'
      });
      validations.push({
        path: `${role.id}.id`,
        message: `Role ${role.id} has a reserved character`,
        severity: 'WARNING',
        code: 'RESERVED_ROLE_CHARACTER',
        url: ''
      });
    }
  });
  return validations;
};
