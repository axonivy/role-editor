import { Emitter } from '@axonivy/jsonrpc';
import type {
  EditorFileContent,
  RoleActionArgs,
  RoleClient,
  RoleEditorData,
  RoleMetaRequestTypes,
  RoleSaveDataArgs,
  ValidationResult
} from '@axonivy/role-editor-protocol';
import { data } from './data-mock';
import { validateMock } from './validation-mock';

export class RoleClientMock implements RoleClient {
  private roleData: RoleEditorData;
  constructor() {
    this.roleData = {
      context: { app: 'mockApp', pmv: 'mockPmv', file: 'roles.yaml' },
      data: data,
      helpUrl: 'https://dev.axonivy.com',
      readonly: false
    };
  }

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  initialize(): Promise<void> {
    return Promise.resolve();
  }

  data(): Promise<RoleEditorData> {
    return Promise.resolve(this.roleData);
  }

  saveData(saveData: RoleSaveDataArgs): Promise<EditorFileContent> {
    this.roleData.data = saveData.data;
    return Promise.resolve({ content: '' });
  }

  validate(): Promise<ValidationResult[]> {
    return Promise.resolve(validateMock(this.roleData.data));
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
