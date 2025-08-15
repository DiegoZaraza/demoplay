import { Page, expect } from '@playwright/test';

type Profile = { fullname: string; email: string };

export class ProfilePage {
  constructor(private page: Page) {}

  private key = 'dmz_profile';

  async setProfile(p: Profile) {
    await this.page.addInitScript(({ key, p }) => {
      localStorage.setItem(key, JSON.stringify(p));
    }, { key: this.key, p });
    await this.page.reload();
  }

  async updateProfile(p: Partial<Profile>) {
    await this.page.evaluate(({ key, p }) => {
      const current = JSON.parse(localStorage.getItem(key) || '{}');
      const updated = { ...current, ...p };
      localStorage.setItem(key, JSON.stringify(updated));
    }, { key: this.key, p });
  }

  async getProfile(): Promise<Profile> {
    const data = await this.page.evaluate((key) => localStorage.getItem(key), this.key);
    return data ? JSON.parse(data) : {} as Profile;
  }

  async expectProfile(p: Profile) {
    const current = await this.getProfile();
    expect(current).toMatchObject(p);
  }
}