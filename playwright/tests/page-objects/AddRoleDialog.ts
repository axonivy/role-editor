import { type Locator, type Page } from '@playwright/test';
import { Select } from './components/Select';
import { Textbox } from './components/Textbox';

export class AddRoleDialog {
  readonly page: Page;
  readonly locator: Locator;
  readonly name: Textbox;
  readonly parent: Select;
  readonly cancel: Locator;
  readonly create: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locator = this.page.getByRole('dialog');
    this.name = new Textbox(this.locator, { name: 'Name' });
    this.parent = new Select(this.page, this.locator, { name: 'Parent Role' });
    this.cancel = this.locator.getByRole('button', { name: 'Cancel' });
    this.create = this.locator.getByRole('button', { name: 'Create' });
  }
}
