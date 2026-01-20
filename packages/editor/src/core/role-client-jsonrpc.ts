import {
  BaseRpcClient,
  createMessageConnection,
  Emitter,
  urlBuilder,
  type Connection,
  type Disposable,
  type MessageConnection
} from '@axonivy/jsonrpc';
import type {
  EditorFileContent,
  Event,
  RoleActionArgs,
  RoleClient,
  RoleContext,
  RoleEditorData,
  RoleNotificationTypes,
  RoleOnNotificationTypes,
  RoleRequestTypes,
  RoleSaveDataArgs,
  ValidationResult
} from '@axonivy/role-editor-protocol';

export class RoleClientJsonRpc extends BaseRpcClient implements RoleClient {
  protected onDataChangedEmitter = new Emitter<void>();
  protected onValidationChangedEmitter = new Emitter<void>();
  onDataChanged: Event<void> = this.onDataChangedEmitter.event;
  onValidationChanged: Event<void> = this.onValidationChangedEmitter.event;

  protected override setupConnection(): void {
    super.setupConnection();
    this.toDispose.push(this.onDataChangedEmitter);
    this.toDispose.push(this.onValidationChangedEmitter);
    this.onNotification('dataChanged', data => {
      this.onDataChangedEmitter.fire(data);
    });
    this.onNotification('validationChanged', data => {
      this.onValidationChangedEmitter.fire(data);
    });
  }

  initialize(context: RoleContext): Promise<void> {
    return this.sendRequest('initialize', { ...context });
  }

  data(context: RoleContext): Promise<RoleEditorData> {
    return this.sendRequest('data', { ...context });
  }

  saveData(saveData: RoleSaveDataArgs): Promise<EditorFileContent> {
    return this.sendRequest('saveData', { ...saveData });
  }

  validate(context: RoleContext): Promise<ValidationResult[]> {
    return this.sendRequest('validate', { ...context });
  }

  action(action: RoleActionArgs): void {
    void this.sendNotification('action', action);
  }

  sendRequest<K extends keyof RoleRequestTypes>(command: K, args?: RoleRequestTypes[K][0]): Promise<RoleRequestTypes[K][1]> {
    return args === undefined ? this.connection.sendRequest(command) : this.connection.sendRequest(command, args);
  }

  sendNotification<K extends keyof RoleNotificationTypes>(command: K, args: RoleNotificationTypes[K]): Promise<void> {
    return this.connection.sendNotification(command, args);
  }

  onNotification<K extends keyof RoleOnNotificationTypes>(kind: K, listener: (args: RoleOnNotificationTypes[K]) => unknown): Disposable {
    return this.connection.onNotification(kind, listener);
  }

  public static webSocketUrl(url: string) {
    return urlBuilder(url, 'ivy-role-lsp');
  }

  public static async startClient(connection: Connection): Promise<RoleClientJsonRpc> {
    return this.startMessageClient(createMessageConnection(connection.reader, connection.writer));
  }

  public static async startMessageClient(connection: MessageConnection): Promise<RoleClientJsonRpc> {
    const client = new RoleClientJsonRpc(connection);
    await client.start();
    return client;
  }
}
