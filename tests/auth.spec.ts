import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Users } from '../utils/test-data';

test('Standard User Can Login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(Users.standard.username, Users.standard.password);
    await login.expectOnInventory();
});

test('Locked Out User Error Displayed', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(Users.locked.username, Users.locked.password);
    await login.lockOutErrorDisplayed(`Epic sadface: Sorry, this user has been locked out.`);
});