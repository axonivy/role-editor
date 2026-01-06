import type { RoleMetaRequestTypes } from '@axonivy/role-editor-protocol';
import { useQuery } from '@tanstack/react-query';
import { genQueryKey } from '../query/query-client';
import { useClient } from './ClientContext';

type NonUndefinedGuard<T> = T extends undefined ? never : T;

export function useMeta<TMeta extends keyof RoleMetaRequestTypes>(
  path: TMeta,
  args: RoleMetaRequestTypes[TMeta][0],
  initialData: NonUndefinedGuard<RoleMetaRequestTypes[TMeta][1]>
): { data: RoleMetaRequestTypes[TMeta][1] } {
  const client = useClient();
  return useQuery({
    queryKey: genQueryKey(path, args),
    queryFn: () => client.meta(path, args),
    initialData: initialData
  });
}
