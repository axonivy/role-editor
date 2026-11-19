import { expect, test, type Page } from '@playwright/test';
import { RoleEditor } from '../page-objects/RoleEditor';

test('table', async ({ page }) => {
  const editor = await RoleEditor.openMock(page);
  const dialog = await editor.main.openAddRoleDialog();
  await dialog.name.locator.fill('invalid#role');
  await dialog.create.click();
  const validations = editor.main.table.locator.locator('.ui-message-row');
  const linkedValidation = validations.filter({ hasText: 'Role invalid#role contains invalid characters' });
  const unlinkedValidation = validations.filter({ hasText: 'Role invalid#role has a reserved character' });
  await expect(linkedValidation).toBeVisible();
  await expect(unlinkedValidation).toBeVisible();

  const openUrlButton = linkedValidation.getByRole('button', { name: 'INVALID_ROLE_ID' });
  await expect(openUrlButton).toBeVisible();
  await expect(unlinkedValidation.getByRole('button')).toHaveCount(0);

  await expect(editor.detail.locator.getByRole('button', { name: 'INVALID_ROLE_ID' })).toBeVisible();

  const action = consoleLog(page);
  await openUrlButton.click();
  expect(await action).toContain('"actionId":"openUrl"');
  expect(await action).toContain('"payload":"https://dev.axonivy.com/roles"');
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

const consoleLog = (page: Page) =>
  new Promise<string>(resolve => {
    const listener = (message: import('@playwright/test').ConsoleMessage) => {
      if (message.type() === 'log' && message.text().includes('"actionId":"openUrl"')) {
        page.off('console', listener);
        resolve(message.text());
      }
    };
    page.on('console', listener);
  });
