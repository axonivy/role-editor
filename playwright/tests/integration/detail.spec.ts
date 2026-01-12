import { expect, test } from '@playwright/test';
import { RoleEditor } from '../page-objects/RoleEditor';

test('empty', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await expect(editor.detail.header).toHaveText('Role');
  await expect(editor.detail.content).toBeHidden();
  const emptyMessage = editor.detail.locator.locator('.ui-panel-message');
  await expect(emptyMessage).toBeVisible();
  await expect(emptyMessage).toHaveText('No Role Selected');
});

test('edit role', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.row(0).locator.click();
  await expect(editor.detail.header).toHaveText('Employee');
  await expect(editor.detail.content).toBeVisible();

  await expect(editor.detail.name).toHaveValue('Employee');
  await expect(editor.detail.displayName).toHaveValue('Employee role');
  await expect(editor.detail.parent.locator).toHaveText('');
  await editor.detail.members.expectToHaveValue('Manager,Teamleader');

  await editor.detail.displayName.fill('Updated Employee role');
  await editor.detail.parent.select('Order (Order)');
  await editor.detail.members.select('Deliverer (Deliverer)');
  await page.keyboard.press('Escape');
  await editor.main.table.row(0).expectToHaveColumns('Employee', 'Order', 'ManagerTeamleaderDeliverer');
});

test('update role references', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.row(0).expectToHaveColumns('Employee', '', 'ManagerTeamleader');
  await editor.main.table.row(2).expectToHaveColumns('Manager', '', '');
  await editor.main.table.row(3).expectToHaveColumns('HR Manager', 'Manager', '');

  await editor.main.table.row(2).locator.click();
  await expect(editor.detail.header).toHaveText('Manager');
  await expect(editor.detail.name).toHaveValue('Manager');

  await editor.detail.name.fill('Manager123');
  await expect(editor.detail.header).toHaveText('Manager123');
  await expect(editor.detail.name).toHaveValue('Manager123');
  await editor.main.table.row(0).expectToHaveColumns('Employee', '', 'Manager123Teamleader');
  await editor.main.table.row(2).expectToHaveColumns('Manager123', '', '');
  await editor.main.table.row(3).expectToHaveColumns('HR Manager', 'Manager123', '');
});
