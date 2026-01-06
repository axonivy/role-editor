import type { RoleData } from '@axonivy/role-editor-protocol';
import type { MessageData } from '@axonivy/ui-components';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useValidateAddRole = (name: string, roles: Array<RoleData>) => {
  const { t } = useTranslation();

  const trimmedName = name.trim();
  const nameValidationMessage = useMemo<MessageData | undefined>(() => {
    if (trimmedName === '') {
      return toErrorMessage(t('message.emptyName'));
    }
    if (trimmedName.includes('.')) {
      return toErrorMessage(t('message.notAllowedChar'));
    }
    if (roles.map(role => role.id).includes(trimmedName)) {
      return toErrorMessage(t('message.roleAlreadyExists'));
    }
    return;
  }, [trimmedName, roles, t]);

  return { nameValidationMessage };
};

const toErrorMessage = (message: string): MessageData => ({ message: message, variant: 'error' });
