import { test } from '@playwright/test';
import { RoleEditor } from '../page-objects/RoleEditor';
import { screenshotElement } from './screenshot-util';

test('add role', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  const dialog = await editor.main.openAddRoleDialog();
  await dialog.name.locator.fill('New Role');
  await screenshotElement(dialog.locator, 'dialog-add-role');
});
