import { test, expect } from '@playwright/test';
import { LoginPage } from '../SauceDemo/login.page';

const baseUrl = require('../fixtures/url.json').baseUrl;
// -----------------------------------------------------------------Cas Test 1 et Cas Test 2 --------------------------------------------------------
test.describe('Authentification Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo(baseUrl);
  });

  test('Cas test 1 - LogIn and LogOut', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(`${baseUrl}inventory.html`);

    await loginPage.logout();
    await expect(page).toHaveURL(baseUrl);
  });

  test('Cas test 2 - Login with locked_out account', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out.");
  });
});