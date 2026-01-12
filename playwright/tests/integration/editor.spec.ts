import { expect, test } from '@playwright/test';
import { AddRoleDialog } from '../page-objects/AddRoleDialog';
import { RoleEditor } from '../page-objects/RoleEditor';

test('data', async ({ page }) => {
  const editor = await RoleEditor.openRole(page);
  await expect(editor.main.locator.getByText('Roles').first()).toBeVisible();
  await editor.main.table.expectToHaveRows(['Employee', '', 'ManagerTeamleader'], ['Teamleader', '', ''], ['Manager', '', ''], ['HR Manager', 'Manager', '']);
});

test('save data', async ({ page, browserName }, testInfo) => {
  const editor = await RoleEditor.openRole(page);
  const dialog = await editor.main.openAddRoleDialog();
  const newRoleName = `role-${browserName}-${testInfo.retry}`;
  await dialog.name.locator.fill(newRoleName);
  await dialog.create.click();
  const row = editor.main.table.lastRow();
  await row.expectToHaveColumns(newRoleName, '', '');

  await row.locator.click();
  await expect(editor.detail.header).toHaveText(newRoleName);
  await editor.detail.parent.select('Employee');
  await row.expectToHaveColumns(newRoleName, 'Employee', '');

  await page.reload();
  await row.expectToHaveColumns(newRoleName, 'Employee', '');

  await row.locator.click();
  await editor.main.delete.click();
  await expect(row.column(0).locator).not.toHaveText(newRoleName);
});

test('select role', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.expectToHaveNoSelection();
  await expect(editor.detail.header).toHaveText('Role');

  await editor.main.table.row(0).locator.click();
  await expect(editor.detail.header).toHaveText('Employee');

  await editor.main.table.header(0).locator.click();
  await editor.main.table.expectToHaveNoSelection();
  await expect(editor.detail.header).toHaveText('Role');
});

test('search', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.expectToHaveRowCount(12);
  await editor.main.search.fill('ager');
  await editor.main.table.expectToHaveRowCount(7);
});

test('sort', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.expectToHaveRows(['Employee', '', 'ManagerTeamleader']);
  await editor.main.table.header(0).locator.getByRole('button', { name: 'Sort by Name' }).click();
  await editor.main.table.expectToHaveRows(['Deliverer', 'Order', '']);
});

test('add', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.expectToHaveRowCount(12);
  const dialog = await editor.main.openAddRoleDialog();
  await dialog.name.locator.fill('NewRole');
  await dialog.cancel.click();
  await editor.main.table.expectToHaveRowCount(12);

  await editor.main.openAddRoleDialog();
  await dialog.name.locator.fill('NewRole');
  await dialog.parent.select('Manager (Manager)');
  await dialog.create.click();
  await editor.main.table.expectToHaveRowCount(13);
  await editor.main.table.row(12).expectToHaveColumns('NewRole', 'Manager', '');

  await editor.main.table.row(12).locator.click();
  await editor.main.delete.click();
  await editor.main.table.expectToHaveRowCount(12);
});

test('empty', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.clear();
  await expect(editor.main.locator).toBeHidden();
  const mainPanel = page.locator('.role-editor-main-panel');
  const emptyMessage = mainPanel.locator('.ui-panel-message');
  await expect(emptyMessage).toBeVisible();

  await mainPanel.locator('button', { hasText: 'Add Role' }).click();
  const dialog = new AddRoleDialog(page);
  await expect(dialog.locator).toBeVisible();
  await dialog.cancel.click();
  await expect(dialog.locator).toBeHidden();

  await page.keyboard.press('a');
  await expect(dialog.locator).toBeVisible();
});
