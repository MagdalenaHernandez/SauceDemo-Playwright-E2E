import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { Users } from '../utils/test-data';
import { expectStringAsc, expectStringDesc, expectNumbersAsc, expectNumbersDesc } from '../utils/sort-helpers';

test.describe('Product Sorting', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(Users.standard.username, Users.standard.password);
    });

test('Sort Items Names in Ascending and Descending Order', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectOnPage();

    await products.sortBy('az');
    expectStringAsc(await products.getAllItemsNames());
    await products.sortBy('za');
    expectStringDesc(await products.getAllItemsNames());
});

test('Sort Item Prices in Ascending and Descending Order', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.expectOnPage();

    await products.sortBy('lohi');
    expectNumbersAsc(await products.getAllItemPrices());
    await products.sortBy('hilo');
    expectNumbersDesc(await products.getAllItemPrices());
});

});