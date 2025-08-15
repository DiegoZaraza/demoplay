import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async openModal() {
    await this.page.click("#login2");
    await expect(this.page.locator("#logInModal")).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.openModal();
    await this.page.fill("#loginusername", username);
    await this.page.fill("#loginpassword", password);
    const dialogPromise = new Promise<string>((resolve) => {
      this.page.once("dialog", async (d) => {
        const m = d.message();
        await d.accept();
        resolve(m);
      });
    });
    await this.page.click("button[onclick='logIn()']");
    return dialogPromise; // If login fails, Demoblaze fires an alert
  }

  async expectLoginSuccess(username: string) {
    await expect(this.page.locator("#nameofuser")).toHaveText(
      `Welcome ${username}`
    );
  }
}
