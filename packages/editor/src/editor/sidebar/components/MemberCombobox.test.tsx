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

test('select', async () => {
  const { data } = renderCombobox();
  const input = screen.getByRole('combobox');
  expect(input).toHaveAttribute('data-value', 'Employee');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  await userEvent.click(input);
  expect(screen.getByRole('listbox')).toBeVisible();
  expect(screen.getAllByRole('option')).toHaveLength(4);
  expect(screen.getByRole('option', { name: 'Employee (Employee)' })).toHaveAttribute('data-selected');
  await userEvent.click(screen.getByRole('option', { name: 'Teamleader' }));
  expect(data()).toEqual(['Employee', 'Teamleader']);
});

test('select can be handled with keyboard', async () => {
  const { data } = renderCombobox();
  const input = screen.getByRole('combobox');
  expect(input).toHaveAttribute('data-value', 'Employee');
  await userEvent.keyboard('[Tab]');
  expect(input).toHaveFocus();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  await userEvent.keyboard('[ArrowDown]');
  expect(screen.getByRole('listbox')).toBeInTheDocument();
  expect(screen.getAllByRole('option')).toHaveLength(4);
  expect(screen.getByRole('option', { name: 'Employee (Employee)' })).toHaveAttribute('data-selected');
  expect(screen.getByRole('option', { name: 'Employee (Employee)' })).toHaveAttribute('data-highlighted');
  await userEvent.keyboard('t');
  expect(screen.getAllByRole('option')).toHaveLength(1);
  await userEvent.keyboard('[ArrowDown]');
  expect(screen.getByRole('option', { name: 'Teamleader' })).toHaveAttribute('data-highlighted');
  await userEvent.keyboard('[Enter]');
  expect(data()).toEqual(['Employee', 'Teamleader']);
});

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

test('readonly mode', () => {
  customRender(<MemberCombobox value={['Employee']} onChange={() => {}} members={members} />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('combobox')).toBeDisabled();
});
