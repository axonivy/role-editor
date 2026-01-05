import { test } from '@playwright/test';
import { RoleEditor } from '../page-objects/role-editor';
import { screenshotElement } from './screenshot-util';

test('editor', async ({ page }) => {
  await RoleEditor.openMock(page);
  await screenshotElement(page.getByText('role editor'), 'dialog-create-from-data');
});
