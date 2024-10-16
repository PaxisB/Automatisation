import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }
}