import { expect, test } from '@playwright/test';
import { RoleEditor } from '../page-objects/RoleEditor';

test('theme light', async ({ page }) => {
  await RoleEditor.openRole(page, { theme: 'light' });
  await expect(page.locator('html')).toHaveClass('light');
});

test('theme dark', async ({ page }) => {
  await RoleEditor.openRole(page, { theme: 'dark' });
  await expect(page.locator('html')).toHaveClass('dark');
});

test('readonly false', async ({ page }) => {
  const editor = await RoleEditor.openRole(page, { readonly: false });
  await expect(editor.toolbar.redo).toBeVisible();
  await expect(editor.toolbar.undo).toBeVisible();
  await expect(editor.main.add).toBeVisible();
  await expect(editor.main.delete).toBeVisible();
});

test('readonly true', async ({ page }) => {
  const editor = await RoleEditor.openRole(page, { readonly: true });
  await expect(editor.toolbar.redo).toBeHidden();
  await expect(editor.toolbar.undo).toBeHidden();
  await expect(editor.main.add).toBeHidden();
  await expect(editor.main.delete).toBeHidden();

  await page.keyboard.press('a');
  await expect(page.getByRole('dialog')).toBeHidden();
});
