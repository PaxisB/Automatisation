import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async sortProducts(order: string) {
    await this.page.selectOption('[data-test="product-sort-container"]', order);
  }

  async getProductNames() {
    return await this.page.$$eval('[data-test="inventory-item-name"]', items => 
      items.map(item => item.textContent?.trim() || '')
    );
  }

  async getProductPrices() {
    return await this.page.$$eval('[data-test="inventory-item-price"]', items => 
      items.map(item => item.textContent?.trim() || '')
    );
  }

  async addToCart(index: number) {
    await this.page.click(`[data-test^="add-to-cart-sauce-labs"]:nth-of-type(${index + 1})`);
  }
}