import { expect, test } from '@playwright/test';
import { RoleEditor } from '../page-objects/role-editor';

test('canvas', async ({ page }) => {
  await RoleEditor.openMock(page);
  await expect(page.getByText('Roles').first()).toBeVisible();
});
