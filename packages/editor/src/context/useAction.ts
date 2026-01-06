import type { RoleActionArgs } from '@axonivy/role-editor-protocol';
import { useAppContext } from './AppContext';
import { useClient } from './ClientContext';

export function useAction(actionId: RoleActionArgs['actionId']) {
  const { context } = useAppContext();
  const client = useClient();

  return (content?: RoleActionArgs['payload']) => {
    let payload = content ?? '';
    if (typeof payload === 'object') {
      payload = JSON.stringify(payload);
    }
    client.action({ actionId, context, payload });
  };
}
