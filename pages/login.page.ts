import { BasePage } from "./base.page";
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
    
    private usernameField = this.page.getByTestId('username');
    private passwordField = this.page.getByTestId('password');
    private loginButton = this.page.getByTestId('login-button');
    private errorMessage = this.page.getByTestId('error');

    async goto() {
        await this.page.goto('/');
    }
    async login (user:string, password:string) {
    await this.usernameField.fill(user);
    await this.passwordField.fill(password);
    await this.loginButton.click();
}
    async expectOnInventory() {
    await this.waitForUrlIncludes('inventory');
    await expect (this.page.locator('.title')).toHaveText('Products');
    }
    async lockOutErrorDisplayed(text: string){
    await expect(this.errorMessage).toContainText(text);
    }

}

