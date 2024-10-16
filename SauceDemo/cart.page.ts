import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }

  async verifyOrderComplete() {
    await this.page.waitForSelector('[data-test="complete-header"]');
    const header = (await this.page.textContent('[data-test="complete-header"]')) ?? '';
    const text = (await this.page.textContent('[data-test="complete-text"]')) ?? '';

    if (header !== "Thank you for your order!" || !text.includes("Your order has been dispatched")) {
      throw new Error("Order completion message not as expected");
    }
  }
}