import { type Locator, type Page } from '@playwright/test';
import { Combobox } from './components/Combobox';
import { Select } from './components/Select';
import { Textbox } from './components/Textbox';

export class Detail {
  readonly page: Page;
  readonly locator: Locator;
  readonly header: Locator;
  readonly help: Locator;
  readonly name: Textbox;
  readonly displayName: Locator;
  readonly parent: Select;
  readonly members: Combobox;

  constructor(page: Page) {
    this.page = page;
    this.locator = this.page.locator('#role-editor-detail');
    this.header = this.locator.locator('.ui-sidebar-header');
    this.help = this.locator.getByRole('button', { name: 'Open Help' });
    this.name = new Textbox(this.locator, { name: 'Name' });
    this.displayName = this.locator.getByLabel('Display Name', { exact: true });
    this.parent = new Select(page, this.locator, { name: 'Parent Role' });
    this.members = new Combobox(page, this.locator, { name: 'Members' });
  }
}
