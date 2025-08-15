import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';

const initial = { fullname: 'Admin User', email: 'admin@example.com' };
const changed  = { fullname: 'Admin User Updated', email: 'admin.updated@example.com' };

// Simula modificación de datos personales y persistencia via localStorage

test.describe('Perfil (simulado)', () => {
  test('Cambios persisten entre recargas', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const profile = new ProfilePage(page);
    await profile.setProfile(initial);
    await profile.expectProfile(initial);

    await profile.updateProfile(changed);
    await profile.expectProfile(changed);

    // Reload para validar persistencia en sesión/navegador
    await page.reload();
    await profile.expectProfile(changed);
  });
});