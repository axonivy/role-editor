import { type Locator, type Page } from '@playwright/test';
import { Combobox } from './components/Combobox';
import { Select } from './components/Select';

export class Detail {
  readonly page: Page;
  readonly locator: Locator;
  readonly header: Locator;
  readonly help: Locator;
  readonly content: Locator;
  readonly name: Locator;
  readonly displayName: Locator;
  readonly parent: Select;
  readonly members: Combobox;

  constructor(page: Page) {
    this.page = page;
    this.locator = this.page.locator('.role-editor-detail-panel');
    this.header = this.locator.locator('.role-editor-detail-header');
    this.help = this.locator.getByRole('button', { name: 'Open Help' });
    this.content = this.locator.locator('.role-editor-detail-content');
    this.name = this.locator.getByLabel('Name', { exact: true });
    this.displayName = this.locator.getByLabel('Display Name', { exact: true });
    this.parent = new Select(page, this.locator, { name: 'Parent Role' });
    this.members = new Combobox(page, this.locator, { name: 'Members' });
  }
}
