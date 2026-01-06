import type { RoleData } from '@axonivy/role-editor-protocol';
import { BasicSelect, type BasicSelectProps } from '@axonivy/ui-components';
import { roleLabel } from '../utils/role-label';

type RoleSelectProps = Omit<BasicSelectProps, 'items'> & {
  roles: Array<RoleData>;
};

export const RoleSelect = ({ roles, ...props }: RoleSelectProps) => (
  <BasicSelect emptyItem={true} items={roles.map(role => ({ label: roleLabel(role), value: role.id }))} {...props} />
);
