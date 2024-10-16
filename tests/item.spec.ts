import { test, expect } from '@playwright/test';
import { LoginPage } from '../SauceDemo/login.page';
import { InventoryPage } from '../SauceDemo/inventory.page';
import { CartPage } from '../SauceDemo/cart.page';

const baseUrl = require('../fixtures/url.json').baseUrl;
//--------------------------------------------------------------------- Cas de test 5 ---------------------------------------------------------------------------------------
test.describe('Item Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigateTo(baseUrl);
  });

  test('Cas test 5 - Second item in my cart', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(`${baseUrl}inventory.html`);

    await page.click('[data-test="inventory-item-name"]');

    const itemDetails = {
      title: await page.textContent('.inventory_details_name'),
      description: await page.textContent('.inventory_details_desc'),
      price: await page.textContent('.inventory_details_price'),
    };

    const addToCartButton = page.locator('[data-test="add-to-cart"]');
    await addToCartButton.click();

    
    await page.locator('[data-test="shopping-cart-link"]').click();

    
    await expect(page).toHaveURL(`${baseUrl}cart.html`);
  
    // Get the item details from the cart
    const cartItemTitle = await page.locator('.inventory_item_name').textContent();
    const cartItemDesc = await page.locator('.inventory_item_desc').textContent();
    const cartItemPrice = await page.locator('.inventory_item_price').textContent();
  
    // Verify the item details in the cart match the selected item details
    expect(cartItemTitle?.trim()).toBe(itemDetails.title?.trim());
    expect(cartItemDesc?.trim()).toBe(itemDetails.description?.trim());
    expect(cartItemPrice?.trim()).toBe(itemDetails.price?.trim());
  });
});