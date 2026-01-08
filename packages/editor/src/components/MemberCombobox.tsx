import type { RoleData } from '@axonivy/role-editor-protocol';
import { Button, cn, Flex, IvyIcon, useField, useReadonly } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { Combobox } from '@base-ui/react/combobox';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { roleLabel } from '../utils/role-label';
import styles from './MemberCombobox.module.css';

type MemberComboboxProps = {
  value: string[];
  onChange: (value: string[]) => void;
  items: RoleData[];
};

export default function MemberCombobox({ value, onChange, items }: MemberComboboxProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { inputProps } = useField();
  const { t } = useTranslation();
  const readonly = useReadonly();
  return (
    <Combobox.Root items={items} multiple value={value} onValueChange={onChange} disabled={readonly}>
      <Combobox.Chips className={cn(styles.Chips, 'ui-combobox-root')} ref={containerRef}>
        <Combobox.Value>
          {(members: string[]) => (
            <React.Fragment>
              {members.map(member => (
                <Combobox.Chip key={member} className={styles.Chip} aria-label={member}>
                  {member}
                  <Combobox.ChipRemove aria-label={t('common.label.remove')} render={<Button icon={IvyIcons.Close} />} />
                </Combobox.Chip>
              ))}
              <Flex alignItems='center' gap={1} className={styles.InputGroup}>
                <Combobox.Input className={styles.Input} {...inputProps} data-value={members.join(',')} />
                <Combobox.Trigger className={styles.Trigger} render={<Button icon={IvyIcons.Chevron} rotate={90} />} />
              </Flex>
            </React.Fragment>
          )}
        </Combobox.Value>
      </Combobox.Chips>

      <Combobox.Portal>
        <Combobox.Positioner className={styles.Positioner} sideOffset={4} anchor={containerRef}>
          <Combobox.Popup className={styles.Popup}>
            <Combobox.Empty className={styles.Empty}>{t('label.noRolesFound')}</Combobox.Empty>
            <Combobox.List>
              {(member: RoleData) => (
                <Combobox.Item key={member.id} className={styles.Item} value={member.id}>
                  <Combobox.ItemIndicator className={styles.ItemIndicator}>
                    <IvyIcon icon={IvyIcons.Check} />
                  </Combobox.ItemIndicator>
                  <div className={styles.ItemText}>{roleLabel(member)}</div>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
