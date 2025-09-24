import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private pageTitle = this.page.getByTestId('title');
  private rows = this.page.locator('.cart_item'); 
  private nameCells = this.page.getByTestId('inventory-item-name');
  private priceCells = this.page.getByTestId('inventory-item-price');
  private qtyCells = this.page.getByTestId('item-quantity');
  private continueShoppingButton = this.page.getByTestId('continue-shopping');
  private checkoutButton = this.page.getByTestId('checkout');

  private toItemId(name: string) {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
 
  rowByName(name: string) {
    const nameCell = this.page.getByTestId('inventory-item-name').filter({ hasText: name });
    return this.rows.filter({ has: nameCell });
  }

  async expectOnPage() {
    await this.waitForUrlIncludes('cart');
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async expectItem(name: string) {
    await expect(this.rowByName(name)).toBeVisible();
  }

  async removeItem(name: string) {
    const id = this.toItemId(name);
    await this.page.getByTestId(`remove-${id}`).click();
  }

  async quantity(name: string): Promise<number> {
    const txt = await this.rowByName(name).getByTestId('item-quantity').innerText();
    return Number(txt.trim());
  }

  async expectEmpty() {
    await expect(this.rows).toHaveCount(0);
  }

  async clearCart() {
    const buttons = this.page.getByRole('button', { name: /^Remove$/ });
    while (await buttons.count()) {
      await buttons.first().click();
    }
  }
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

}