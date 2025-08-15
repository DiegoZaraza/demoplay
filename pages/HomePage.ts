import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly categories: Locator;
  readonly cartLink: Locator;
  readonly loginButton: Locator;
  readonly welcomeUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categories = page.locator('#itemc'); // all category buttons
    this.cartLink = page.locator('#cartur');
    this.loginButton = page.locator('#login2');
    this.welcomeUser = page.locator('#nameofuser');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openCategory(name: string) {
    await this.page.getByRole('link', { name }).click();
    await this.page.waitForLoadState();  }

  async expectCategories(names: string[]) {
    const texts = await this.categories.allTextContents();
    for (const n of names) expect(texts).toContain(n);
  }

  async openProductByName(name: string) {
    await this.page.getByRole('link', { name }).first().click();
  }
}