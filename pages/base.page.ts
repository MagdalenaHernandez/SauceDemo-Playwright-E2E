import { Page, expect } from '@playwright/test';

export class BasePage {  
constructor(protected page: Page) {}
async waitForUrlIncludes(part: string) {
await expect(this.page).toHaveURL(new RegExp(part));
}
}