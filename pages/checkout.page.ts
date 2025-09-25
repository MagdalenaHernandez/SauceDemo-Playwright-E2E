import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
    private pageTitle = this.page.getByTestId('title');
    private firstName = this.page.getByTestId('firstName');
    private LastName = this.page.getByTestId('lastName');
    private ZipCode = this.page.getByTestId('postalCode');
    private continueButton = this.page.getByTestId('continue');
    private cancelButton = this.page.getByTestId('cancel');
    private itemName = this.page.getByTestId('inventory-item-name');
    private finishButton = this.page.getByTestId('finish');
    private completeHeader = this.page.getByTestId('complete-header');

    async stepOne(first:string, last:string, zip:string) {
        await this.waitForUrlIncludes('checkout-step-one');
        await expect(this.pageTitle).toHaveText('Checkout: Your Information');
        await this.firstName.fill(first);
        await this.LastName.fill(last);
        await this.ZipCode.fill(zip);
        await this.continueButton.click();
    }

    async stepTwo(name:string) {
        await this.waitForUrlIncludes('checkout-step-two');
        await expect(this.pageTitle).toHaveText('Checkout: Overview');
        await expect(this.itemName.filter({hasText: name})).toBeVisible();
        await this.finishButton.click();

    }
    
    async expectOnComplete() {
        await this.waitForUrlIncludes('checkout-complete');
        await expect(this.pageTitle).toHaveText('Checkout: Complete!');
        await expect(this.completeHeader).toHaveText('Thank you for your order!');

    }
}