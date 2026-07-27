import { BasicMultiCombobox, useField, useReadonly } from '@axonivy/ui-components';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { roleLabel } from '../../../utils/role-label';

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
  const { inputProps } = useField();
  const { t } = useTranslation();
  const readonly = useReadonly();
  const items = useMemo(() => {
    const merged = [...members];
    const mergedIds = merged.map(item => item.id);
    value.filter(v => !mergedIds.includes(v)).forEach(v => merged.push({ id: v, displayName: v }));
    return merged.map(member => ({ value: member.id, label: roleLabel(member) }));
  }, [members, value]);
  const comboValue = useMemo(() => value.map(v => items.find(r => r.value === v) ?? { value: v, label: v }), [value, items]);
  return (
    <BasicMultiCombobox
      items={items}
      isItemEqualToValue={(itemValue, value) => itemValue.value === value.value}
      value={comboValue}
      onValueChange={items => onChange(items.map(item => item.value))}
      disabled={readonly}
      chipRenderer={item => item.value}
      chipRemoveLabel={t('common.label.remove')}
      emptyLabel={t('label.noRolesFound')}
      {...inputProps}
    />
  );
}
