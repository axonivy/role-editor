import { Emitter } from '@axonivy/jsonrpc';
import type {
  EditorFileContent,
  RoleActionArgs,
  RoleClient,
  RoleData,
  RoleMetaRequestTypes,
  ValidationResult
} from '@axonivy/role-editor-protocol';
import type { RoleSaveData } from '@axonivy/role-editor-protocol/src/data/role-data';
import { validateMock } from './validation-mock';

export class RoleClientMock implements RoleClient {
  private roleData: RoleData;
  constructor() {
    this.roleData = {};
  }

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  initialize(): Promise<void> {
    return Promise.resolve();
  }

  data(): Promise<RoleData> {
    return Promise.resolve(this.roleData);
  }

  saveData(saveData: RoleSaveData): Promise<EditorFileContent> {
    this.roleData = saveData.data;
    return Promise.resolve({ content: '' });
  }

  validate(): Promise<ValidationResult[]> {
    return Promise.resolve(validateMock(this.roleData));
  }

  meta<TMeta extends keyof RoleMetaRequestTypes>(
    path: TMeta,
    args: RoleMetaRequestTypes[TMeta][0]
  ): Promise<RoleMetaRequestTypes[TMeta][1]> {
    console.log(args);
    switch (path) {
      default:
        throw Error('mock meta path not programmed');
    }
  }

  action(action: RoleActionArgs): void {
    console.log('action', JSON.stringify(action));
  }
}
