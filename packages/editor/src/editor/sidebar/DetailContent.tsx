import type { RoleData, Severity, ValidationResult } from '@axonivy/role-editor-protocol';
import { BasicField, BasicInput, Flex, Input, PanelMessage, type MessageData } from '@axonivy/ui-components';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MemberCombobox from '../../components/MemberCombobox';
import { RoleSelect } from '../../components/RoleSelect';
import { useAppContext } from '../../context/AppContext';
import { useValidations } from '../../context/useValidation';
import { updateRoleReferences } from '../../utils/update-role-references';
import { useValidateName, validateName } from '../dialog/useValidateName';
import './DetailContent.css';

export const DetailContent = () => {
  const { t } = useTranslation();
  const { data, setData, selectedIndex } = useAppContext();
  const role = useMemo(() => data[selectedIndex], [data, selectedIndex]);
  const validations = useValidations(role?.id ?? '');
  if (role === undefined) {
    return <PanelMessage message={t('label.noRoleSelected')} />;
  }
  const handleAttributeChange = <T extends keyof RoleData>(key: T, value: RoleData[T]) =>
    setData(old => {
      const oldRole = old[selectedIndex];
      if (oldRole) {
        oldRole[key] = value;
      }
      return structuredClone(old);
    });

  const updateName = (name: string) => {
    setData(old => {
      const oldRole = old[selectedIndex];
      const oldRoleId = oldRole?.id ?? '';
      if (oldRole) {
        oldRole.id = name;
      }
      return updateRoleReferences(old, oldRoleId, name);
    });
  };
  const nameMessage = fieldMessage(validations, role.id, 'id');
  const parentMessage = fieldMessage(validations, role.id, 'parent');
  const memberMessage = fieldMessage(validations, role.id, 'members');

  return (
    <Flex direction='column' gap={4} className='role-editor-detail-content'>
      <NameInput value={role.id} onChange={updateName} roles={data.filter(r => r.id !== role.id)} message={nameMessage} />
      {/* <BasicField label={t('common.label.name')} message={nameMessage}>
        <BasicInput value={name} onChange={event => updateName(event.target.value)} />
      </BasicField> */}
      <BasicField label={t('common.label.displayName')}>
        <BasicInput value={role.displayName} onChange={event => handleAttributeChange('displayName', event.target.value)} />
      </BasicField>
      <BasicField label={t('label.parentRole')} message={parentMessage}>
        <RoleSelect
          value={role.parent}
          onValueChange={value => handleAttributeChange('parent', value)}
          roles={data.filter(r => r.id !== role.id)}
        />
      </BasicField>
      <BasicField label={t('label.memberRoles')} message={memberMessage}>
        <MemberCombobox
          value={role.members}
          onChange={value => handleAttributeChange('members', value)}
          items={data.filter(r => r.id !== role.id)}
        />
      </BasicField>
    </Flex>
  );
};

type NameInputProps = {
  value: string;
  onChange: (change: string) => void;
  roles: RoleData[];
  message?: MessageData;
};

const NameInput = ({ value, onChange, roles, message }: NameInputProps) => {
  const { t } = useTranslation();
  const [currentValue, setCurrentValue] = useState(value ?? '');
  const [prevValue, setPrevValue] = useState(value);
  const nameValidationMessage = useValidateName(currentValue, roles);
  if (value !== undefined && prevValue !== value) {
    setCurrentValue(value);
    setPrevValue(value);
  }
  const updateValue = (value: string) => {
    setCurrentValue(value);
    if (validateName(value, roles) === undefined) {
      onChange?.(value);
    }
  };
  return (
    <BasicField label={t('common.label.name')} message={nameValidationMessage ?? message}>
      <Input value={currentValue} onChange={event => updateValue(event.target.value)} />
    </BasicField>
  );
};

const fieldMessage = (validations: Array<ValidationResult>, roleId: string, field: keyof RoleData) =>
  validations
    .filter(v => v.path === `${roleId}.${field}`)
    .map<MessageData>(v => ({ message: v.message, variant: v.severity.toLocaleLowerCase() as Lowercase<Severity> }))[0];
