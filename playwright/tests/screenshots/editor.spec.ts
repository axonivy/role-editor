import { test } from '@playwright/test';
import { RoleEditor } from '../page-objects/RoleEditor';
import { screenshot } from './screenshot-util';

test('editor', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  await editor.main.table.row(0).locator.click();
  await screenshot(page, 'role-editor');
});
