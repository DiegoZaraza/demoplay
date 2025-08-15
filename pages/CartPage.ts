import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly placeOrderBtn: Locator;
  readonly total: Locator;

  constructor(private page: Page) {
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    this.total = page.locator('#totalp');
  }

  async open() {
    await this.page.click('#cartur');
    await this.page.waitForURL('**/cart.html');
    await this.page.waitForLoadState();
  }

  async deleteFirstItemIfPresent() {
    const firstDelete = this.page.locator("a:has-text('Delete')").first();
    if (await firstDelete.count()) {
      await firstDelete.click();
      await this.page.waitForTimeout(500);
    }
  }

  async getLinePrices(): Promise<number[]> {
    const rows = this.page.locator('#tbodyid .success');
    const count = await rows.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      console.log(`Procesando fila ${i + 1} de ${count}`);
      const priceText = await rows.nth(i).locator('td').nth(2).textContent();
      prices.push(Number(priceText));
    }
    return prices;
  }

  async getTotal(): Promise<number> {
    return Number(await this.total.textContent());
  }

  async placeOrder(data: { name: string; country: string; city: string; card: string; month: string; year: string;}) {
    await this.placeOrderBtn.click();
    await this.page.waitForSelector('#orderModal', { state: 'visible' });
    await this.page.fill('#name', data.name);
    await this.page.fill('#country', data.country);
    await this.page.fill('#city', data.city);
    await this.page.fill('#card', data.card);
    await this.page.fill('#month', data.month);
    await this.page.fill('#year', data.year);
    await this.page.getByRole('button', { name: 'Purchase' }).click();
    await this.page.waitForSelector('.sweet-alert.showSweetAlert.visible', { state: 'visible' });
    const info = await this.page.locator('.sweet-alert .lead').textContent();
    await this.page.getByRole('button', { name: 'OK' }).click();
    return info?.trim() || '';
  }
}