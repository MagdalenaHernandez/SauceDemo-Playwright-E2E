import { BasePage } from "./base.page";
import { expect } from "@playwright/test";

export class ProductsPage extends BasePage {
    private pageTitle = this.page.getByTestId('title');
    private shoppingCartLink = this.page.getByTestId('shopping-cart-link');
    private shoppingCartBadge = this.page.getByTestId('shopping-cart-badge');
    private productSortButton = this.page.getByTestId('product-sort-container');
    private itemCards = this.page.getByTestId('inventory-item');
    private itemTitle = this.page.getByTestId('inventory-item-name');
    private itemPrice = this.page.getByTestId('inventory-item-price');

    private toItemId(name: string) {
        return name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }
    async addToCart(name: string) {
        const id = this.toItemId(name);       
        await this.page.getByTestId(`add-to-cart-${id}`).click();
        await expect(this.page.getByTestId(`remove-${id}`)).toBeVisible();
    }
    async removeFromCart(name: string) {
        const id = this.toItemId(name);
        await this.page.getByTestId(`remove-${id}`).click();
    }
    async expectOnPage() {
        await this.waitForUrlIncludes('inventory');
        await expect(this.pageTitle).toHaveText('Products');
    }
    async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.productSortButton.selectOption(value);
    }
    async expectSortSelected(value: string) {
        await expect(this.productSortButton).toHaveValue(value);
    }
    async openCart() {
        await this.shoppingCartLink.click();
    }
    async expectCartBadgeCount(count: number) {
        if (count === 0) {
            await expect(this.shoppingCartBadge).toHaveCount(0);
        } else {
            await expect(this.shoppingCartBadge).toHaveText(String(count));
        }
    }

    async getAllItemsNames(): Promise<string[]> {
        const names = await this.itemTitle.allTextContents();
        return names;
    }
    async getAllItemPrices(): Promise<number[]> {
        const texts = await this.itemPrice.allTextContents();
        return texts.map(t => Number(t.replace(`$`, '')));
    }


}