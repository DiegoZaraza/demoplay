import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart() {
    const dialogPromise = new Promise<string>(resolve => {
      this.page.once('dialog', async d => {
        const m = d.message();
        await d.accept();
        resolve(m);
      });
    });
    await this.page.waitForLoadState();
    await this.page.click("a[onclick='addToCart(1)']");
    const message = await dialogPromise;
    expect(message).toContain('Product added');
  }
}