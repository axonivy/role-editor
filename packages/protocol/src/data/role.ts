export type Severity = 'INFO' | 'WARNING' | 'ERROR';

export interface ValidationResult {
  message: string;
  path: string;
  severity: Severity;
}

export interface EditorFileContent {
  content: string;
}

export interface RoleContext {
  app: string;
  file: string;
  pmv: string;
}

export interface RoleSaveDataArgs {
  context: RoleContext;
  data: RoleData;
}

export interface RoleData {
  [key: string]: unknown;
}

export interface RoleActionArgs {
  actionId: 'openUrl';
  context: RoleContext;
  payload: string;
}
