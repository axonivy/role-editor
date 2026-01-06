import type { RoleData } from '@axonivy/role-editor-protocol';
import {
  BasicDialogContent,
  BasicField,
  BasicSelect,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  hotkeyText,
  Input,
  selectRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useDialogHotkeys,
  useHotkeys
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Table } from '@tanstack/react-table';
import { useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { useKnownHotkeys } from '../../utils/useKnownHotkeys';
import { useValidateAddRole } from './useValidateAddRole';

const DIALOG_HOTKEY_IDS = ['addRoleDialog'];

export const AddRoleDialog = ({ table, children }: { table: Table<RoleData>; children: ReactNode }) => {
  const { open, onOpenChange } = useDialogHotkeys(DIALOG_HOTKEY_IDS);
  const { addRole: shortcut } = useKnownHotkeys();
  useHotkeys(shortcut.hotkey, () => onOpenChange(true), { scopes: ['global'], keyup: true, enabled: !open });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>{children}</DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{shortcut.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent onCloseAutoFocus={e => e.preventDefault()}>
        <AddDialogContent table={table} closeDialog={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

const AddDialogContent = ({ table, closeDialog }: { table: Table<RoleData>; closeDialog: () => void }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { data, setData, setSelectedElement } = useAppContext();
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const { nameValidationMessage } = useValidateAddRole(name, data);
  const allInputsValid = !nameValidationMessage;

  const addRole = (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
    if (!allInputsValid) {
      return;
    }
    const id = name.trim();
    setData(old => [...old, { id, displayName: '', members: [], parent }]);
    if (!event.ctrlKey && !event.metaKey) {
      closeDialog();
    } else {
      setName('');
      nameInputRef.current?.focus();
    }
    selectRow(table, id);
    setSelectedElement(id);
  };

  const enter = useHotkeys(['Enter', 'mod+Enter'], addRole, { scopes: DIALOG_HOTKEY_IDS, enableOnFormTags: true });

  return (
    <BasicDialogContent
      title={t('dialog.addRole.title')}
      description={t('dialog.addRole.desc')}
      submit={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='primary'
                size='large'
                icon={IvyIcons.Plus}
                aria-label={t('dialog.create')}
                disabled={!allInputsValid}
                onClick={addRole}
              >
                {t('dialog.create')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('dialog.createTooltip', { modifier: hotkeyText('mod') })}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
      cancel={
        <Button variant='outline' size='large'>
          {t('common.label.cancel')}
        </Button>
      }
      ref={enter}
      tabIndex={-1}
    >
      <BasicField label={t('common.label.name')} message={nameValidationMessage} aria-label={t('common.label.name')}>
        <Input ref={nameInputRef} value={name} onChange={event => setName(event.target.value)} />
      </BasicField>
      <BasicField label={t('label.parentRole')} aria-label={t('label.parentRole')}>
        <BasicSelect
          value={parent}
          onValueChange={value => setParent(value)}
          emptyItem={true}
          items={data.map(role => ({ label: `${role.id} (${role.displayName})`, value: role.id }))}
        />
      </BasicField>
    </BasicDialogContent>
  );
};
