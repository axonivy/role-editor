/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { EditorFileContent, RoleActionArgs, RoleContext, RoleEditorData, RoleSaveDataArgs, ValidationResult } from './data/role';

export interface RoleRequestTypes {
  initialize: [RoleContext, void];
  data: [RoleContext, RoleEditorData];
  saveData: [RoleSaveDataArgs, EditorFileContent];

  validate: [RoleContext, ValidationResult[]];
}

export interface RoleNotificationTypes {
  action: RoleActionArgs;
}

export interface RoleOnNotificationTypes {
  dataChanged: void;
  validationChanged: void;
}
