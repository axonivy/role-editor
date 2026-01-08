import { expect, test } from '@playwright/test';
import { RoleEditor } from '../page-objects/RoleEditor';

test('table', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  const dialog = await editor.main.openAddRoleDialog();
  await dialog.name.locator.fill('invalid#role');
  await dialog.create.click();
  await expect(editor.main.table.locator.locator('.ui-message-row')).toHaveText('Role invalid#role contains invalid characters');
});

test('add role', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  const dialog = await editor.main.openAddRoleDialog();
  await (await dialog.name.message()).expectToBeError('Name cannot be empty.');
  await dialog.name.locator.fill('Employee');
  await (await dialog.name.message()).expectToBeError('Role already exists.');
  await dialog.name.locator.fill('Employee1');
  await expect((await dialog.name.message()).locator).toBeHidden();
});
