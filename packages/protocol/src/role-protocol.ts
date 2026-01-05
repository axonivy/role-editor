/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { EditorFileContent, RoleActionArgs, RoleContext, RoleData, ValidationResult } from './data/role';
import type { RoleSaveData } from './data/role-data';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RoleMetaRequestTypes {}

export interface RoleRequestTypes extends RoleMetaRequestTypes {
  initialize: [RoleContext, void];
  data: [RoleContext, RoleData];
  saveData: [RoleSaveData, EditorFileContent];

  validate: [RoleContext, ValidationResult[]];
}

export interface RoleNotificationTypes {
  action: RoleActionArgs;
}

export interface RoleOnNotificationTypes {
  dataChanged: void;
  validationChanged: void;
}
