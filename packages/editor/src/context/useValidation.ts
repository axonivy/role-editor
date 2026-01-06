import type { ValidationResult } from '@axonivy/role-editor-protocol';
import { useAppContext } from './AppContext';

export function useValidations(path: string): ValidationResult[] {
  const { validations } = useAppContext();
  return validations.filter(val => val.path === path);
}
