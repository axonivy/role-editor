import type { RoleData } from '@axonivy/role-editor-protocol';
import type { MessageData } from '@axonivy/ui-components';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useValidateName = (name: string, roles: Array<RoleData>) => {
  const { t } = useTranslation();
  return useMemo<MessageData | undefined>(() => {
    switch (validateName(name, roles)) {
      case 'emptyName':
        return toErrorMessage(t('message.emptyName'));
      case 'roleAlreadyExists':
        return toErrorMessage(t('message.roleAlreadyExists'));
      default:
        return;
    }
  }, [name, roles, t]);
};

export const validateName = (name: string, roles: Array<RoleData>) => {
  const trimmedName = name.trim();
  if (trimmedName === '') {
    return 'emptyName';
  }
  if (roles.map(role => role.id).includes(trimmedName)) {
    return 'roleAlreadyExists';
  }
  return undefined;
};

const toErrorMessage = (message: string): MessageData => ({ message: message, variant: 'error' });
