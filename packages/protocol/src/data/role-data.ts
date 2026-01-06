import type { RoleContext, RoleEditorData } from './role';

export type RoleSaveData = RoleEditorData & {
  directSave?: boolean;
};

export interface RoleActionArgs {
  actionId: 'openUrl';
  context: RoleContext;
  payload: string;
}

export type Severity = 'INFO' | 'WARNING' | 'ERROR';

export interface ValidationResult {
  message: string;
  path: string;
  severity: Severity;
}

export interface EditorFileContent {
  content: string;
}
