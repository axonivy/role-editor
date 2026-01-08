import { expect, type Locator, type Page } from '@playwright/test';
import { AddRoleDialog } from './AddRoleDialog';
import { Table } from './Table';

export class Main {
  readonly locator: Locator;
  readonly add: Locator;
  readonly delete: Locator;
  readonly search: Locator;
  readonly table: Table;

  constructor(readonly page: Page) {
    this.locator = page.locator('.role-editor-main-content');
    this.add = this.locator.getByRole('button', { name: 'Add Role' });
    this.delete = this.locator.getByRole('button', { name: 'Delete Role' });
    this.search = this.locator.getByRole('textbox').first();
    this.table = new Table(page, this.locator);
  }

  public async openAddRoleDialog() {
    await this.add.click();
    const dialog = new AddRoleDialog(this.page);
    await expect(dialog.locator).toBeVisible();
    return dialog;
  }
}
