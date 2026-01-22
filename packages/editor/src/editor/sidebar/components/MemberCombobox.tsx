import { Button, cn, Flex, IvyIcon, useField, useReadonly } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { Combobox } from '@base-ui/react/combobox';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { roleLabel } from '../../../utils/role-label';
import styles from './MemberCombobox.module.css';

type ComboboxItem = {
  id: string;
  displayName: string;
};

type MemberComboboxProps = {
  value: string[];
  onChange: (value: string[]) => void;
  members: ComboboxItem[];
};

export default function MemberCombobox({ value, onChange, members }: MemberComboboxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { inputProps } = useField();
  const { t } = useTranslation();
  const readonly = useReadonly();
  const items = useMemo(() => {
    const merged = [...members];
    value.filter(v => !merged.map(item => item.id).includes(v)).forEach(v => merged.push({ id: v, displayName: v }));
    return merged;
  }, [members, value]);
  return (
    <Combobox.Root items={items.map(item => item.id)} multiple value={value} onValueChange={onChange} disabled={readonly}>
      <Combobox.Chips className={cn(styles.Chips, 'ui-combobox-root')} ref={containerRef}>
        <Combobox.Value>
          {(members: string[]) => (
            <>
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
            </>
          )}
        </Combobox.Value>
      </Combobox.Chips>

      <Combobox.Portal>
        <Combobox.Positioner className={styles.Positioner} sideOffset={4} anchor={containerRef}>
          <Combobox.Popup className={styles.Popup}>
            <Combobox.Empty className={styles.Empty}>{t('label.noRolesFound')}</Combobox.Empty>
            <Combobox.List>
              {(memberId: string) => (
                <Combobox.Item key={memberId} className={styles.Item} value={memberId}>
                  <Combobox.ItemIndicator className={styles.ItemIndicator}>
                    <IvyIcon icon={IvyIcons.Check} />
                  </Combobox.ItemIndicator>
                  <div className={styles.ItemText}>{listItem(memberId, items)}</div>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

const listItem = (memberId: string, items: Array<ComboboxItem>) => {
  const member = items.find(role => role.id === memberId);
  return member ? roleLabel(member) : memberId;
};
