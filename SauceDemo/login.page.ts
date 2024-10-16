import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.waitForSelector('input[data-test="username"]', { timeout: 10000 }); 
    await this.page.fill('input[data-test="username"]', username);
  
    await this.page.waitForSelector('input[data-test="password"]', { timeout: 10000 }); 
    await this.page.fill('input[data-test="password"]', password);
  
    await this.page.waitForSelector('input[data-test="login-button"]', { timeout: 10000 }); 
    await this.page.click('input[data-test="login-button"]');
  }

  async verifyErrorMessage(expectedMessage: string) {
    const errorMessage = await this.page.textContent('[data-test="error"]');
    if (errorMessage !== expectedMessage) {
      throw new Error(`Expected error message to be "${expectedMessage}", but got "${errorMessage}"`);
    }
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
  }
}