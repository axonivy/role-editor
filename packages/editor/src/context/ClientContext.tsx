import type { RoleClient } from '@axonivy/role-editor-protocol';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

export interface ClientContext {
  client: RoleClient;
}

const ClientContextInstance = createContext<ClientContext | undefined>(undefined);
export const useClient = (): RoleClient => {
  const context = useContext(ClientContextInstance);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientContext');
  }
  return context.client;
};

export const ClientContextProvider = ({ client, children }: { client: RoleClient; children: ReactNode }) => {
  return <ClientContextInstance.Provider value={{ client }}>{children}</ClientContextInstance.Provider>;
};
