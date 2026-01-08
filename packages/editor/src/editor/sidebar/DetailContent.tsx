import type { RoleData } from '@axonivy/role-editor-protocol';
import { BasicField, BasicInput, Flex, PanelMessage } from '@axonivy/ui-components';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import MemberCombobox from '../../components/MemberCombobox';
import { RoleSelect } from '../../components/RoleSelect';
import { useAppContext } from '../../context/AppContext';
import './DetailContent.css';

export const DetailContent = () => {
  const { t } = useTranslation();
  const { data, setData, selectedElement } = useAppContext();
  const role = useMemo(() => data.find(role => role.id === selectedElement), [data, selectedElement]);
  if (role === undefined) {
    return <PanelMessage message={t('label.noRoleSelected')} />;
  }
  const handleAttributeChange = <T extends keyof RoleData>(key: T, value: RoleData[T]) =>
    setData(old => {
      const oldRole = old.find(r => r.id === role.id);
      if (oldRole) {
        oldRole[key] = value;
      }
      return structuredClone(old);
    });

  return (
    <Flex direction='column' gap={4} className='role-editor-detail-content'>
      <BasicField label={t('common.label.name')}>
        <BasicInput value={role.id} disabled />
      </BasicField>
      <BasicField label={t('common.label.displayName')}>
        <BasicInput value={role.displayName} onChange={event => handleAttributeChange('displayName', event.target.value)} />
      </BasicField>
      <BasicField label={t('label.parentRole')}>
        <RoleSelect
          value={role.parent}
          onValueChange={value => handleAttributeChange('parent', value)}
          roles={data.filter(r => r.id !== selectedElement)}
        />
      </BasicField>
      <BasicField label={t('label.memberRoles')}>
        <MemberCombobox
          value={role.members}
          onChange={value => handleAttributeChange('members', value)}
          items={data.filter(r => r.id !== selectedElement)}
        />
      </BasicField>
    </Flex>
  );
};
