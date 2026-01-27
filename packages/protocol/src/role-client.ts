import type { EditorFileContent, RoleContext, RoleEditorData, RoleSaveDataArgs, ValidationResult } from './data/role';
import type { RoleActionArgs } from './role-protocol';

export interface Event<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface RoleClient {
  initialize(context: RoleContext): Promise<void>;
  data(context: RoleContext): Promise<RoleEditorData>;
  saveData(saveData: RoleSaveDataArgs): Promise<EditorFileContent>;

  validate(context: RoleContext): Promise<ValidationResult[]>;

  action(action: RoleActionArgs): void;

  onDataChanged: Event<void>;
  onValidationChanged: Event<void>;
}
