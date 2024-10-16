import { test, expect } from '@playwright/test';
import { LoginPage } from '../SauceDemo/login.page';
import { InventoryPage } from '../SauceDemo/inventory.page';
import { CartPage } from '../SauceDemo/cart.page';

const baseUrl = require('../fixtures/url.json').baseUrl;
//---------------------------------------------------------------------------------------Cas test 3 et 4 ---------------------------------------------------------------------------
test.describe('Inventory Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigateTo(baseUrl);
  });

  test('Cas test 3 - Login with standard user, command order test', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(`${baseUrl}inventory.html`);

    await inventoryPage.sortProducts('hilo');

    const productNames = await inventoryPage.getProductNames();
    const productPrices = await inventoryPage.getProductPrices();

    await inventoryPage.addToCart(0);
    await inventoryPage.addToCart(0);

    await cartPage.goToCart();
    await expect(page).toHaveURL(`${baseUrl}cart.html`);

    

    await cartPage.checkout();
    await expect(page).toHaveURL(`${baseUrl}checkout-step-one.html`);

    await cartPage.fillCheckoutForm('Gandalf', 'Olórin', '59654');
    await expect(page).toHaveURL(`${baseUrl}checkout-step-two.html`);


    await cartPage.finishCheckout();
    await expect(page).toHaveURL(`${baseUrl}checkout-complete.html`);
    await cartPage.verifyOrderComplete();
  });

  test('Cas test 4 - Login with standard and sort and verify', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(`${baseUrl}inventory.html`);

    const pricesLowToHigh = (await inventoryPage.getProductPrices()).map(price => parseFloat(price.replace('$', ''))).sort((a, b) => a - b);
    const pricesHighToLow = [...pricesLowToHigh].reverse();

    await inventoryPage.sortProducts('hilo');
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');
    const sortedPrices = await inventoryPage.getProductPrices();
    sortedPrices.forEach((price, index) => {
      expect(parseFloat(price.replace('$', ''))).toEqual(pricesHighToLow[index]);
    });

    await inventoryPage.sortProducts('lohi');
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');
    const sortedPricesLow = await inventoryPage.getProductPrices();
    sortedPricesLow.forEach((price, index) => {
      expect(parseFloat(price.replace('$', ''))).toEqual(pricesLowToHigh[index]);
    });
  });
});