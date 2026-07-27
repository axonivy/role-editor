import type { RoleData } from '@axonivy/role-editor-protocol';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { customRender } from 'test-utils';
import MemberCombobox from './MemberCombobox';

const members: Array<RoleData> = [
  { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Teamleader'], parent: '' },
  { id: 'Teamleader', displayName: '', members: [], parent: '' },
  { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
  { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' }
];

const renderCombobox = (data?: Array<string>) => {
  let value = data ?? ['Employee'];
  customRender(<MemberCombobox value={value} onChange={change => (value = change)} members={members} />);
  return { data: () => value };
};

test('unknown value', async () => {
  const { data } = renderCombobox(['unknown']);
  const input = screen.getByRole('combobox');
  expect(input).toHaveAttribute('data-value', 'unknown');
  await userEvent.click(input);
  expect(screen.getByRole('listbox')).toBeVisible();
  expect(screen.getAllByRole('option')).toHaveLength(5);
  expect(screen.getByRole('option', { name: 'unknown (unknown)' })).toHaveAttribute('data-selected');
  expect(data()).toEqual(['unknown']);
});
