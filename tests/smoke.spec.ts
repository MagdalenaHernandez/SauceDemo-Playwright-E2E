// tests/smoke.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { Users } from '../utils/test-data';

test('@smoke add & remove single item updates cart badge', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const item = 'Sauce Labs Backpack';

    await test.step('Login', async () => {
        await login.goto();
        await login.login(Users.standard.username, Users.standard.password);
    });

    await test.step('Add/remove from products page updates badge', async () => {
        await products.expectOnPage();
        await products.addToCart(item);
        await products.expectCartBadgeCount(1);

        await products.removeFromCart(item);
        await products.expectCartBadgeCount(0);
    });

    await test.step('Add again then verify in cart', async () => {
        await products.addToCart(item);
        await products.expectCartBadgeCount(1);
        await products.openCart();

        await cart.expectOnPage();
        await cart.expectItem(item);
    });

    await test.step('Remove in cart clears badge and contents', async () => {
        await cart.removeItem(item);
        await cart.expectEmpty();
        const badge = page.locator('.shopping_cart_badge');
        await expect(badge).toHaveCount(0);
    });
});

test('@smoke Standard User can complete checkout', async ({ page }) => {
    const item = 'Sauce Labs Backpack';

    const login = new LoginPage(page);
    await login.goto();
    await login.login(Users.standard.username, Users.standard.password);

    const products = new ProductsPage(page);
    await products.expectOnPage();
    await products.addToCart(item);
    await products.expectCartBadgeCount(1);
    await products.openCart();

    const cart = new CartPage(page);
    await cart.expectOnPage();
    await cart.expectItem(item);
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.stepOne('Magdalena', 'QA', '77479');
    await checkout.stepTwo(item);
    await checkout.expectOnComplete();
});

