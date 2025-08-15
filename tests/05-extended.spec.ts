import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

const PRODUCT = 'Samsung galaxy s6';

// 1) Caso negativo: checkout sin productos
// 2) Validación dinámica: "cambiar cantidad" ≈ añadir el mismo producto varias veces y validar el total

test.describe('Casos extendidos', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });

  test('Checkout sin producto muestra validación', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.open();

    // Intentar abrir modal de compra sin items
    await cart.placeOrderBtn.click();

    // En algunos estados el modal no aparece; verificamos que no haya confirmación de compra
    await expect(page.locator('#orderModal')).toBeVisible();
    await page.getByRole('button', { name: 'Purchase' }).click();

    // Validar que NO aparece la alerta de confirmación (pedido exitoso)
    await expect(page.locator('.sweet-alert.showSweetAlert.visible')).toHaveCount(0, { timeout: 3000 });
  });

  test('Añadir mismo producto 2 veces actualiza el total', async ({ page }) => {
    const home = new HomePage(page);
    await home.openCategory('Phones');
    await home.openProductByName(PRODUCT);

    const product = new ProductPage(page);
    await product.addToCart();

    // Volver y añadir de nuevo
    await page.goBack();
    await home.openProductByName(PRODUCT);
    await product.addToCart();

    const cart = new CartPage(page);
    await cart.open();

    const prices = await cart.getLinePrices();
    expect(prices.length).toBeGreaterThanOrEqual(2);

    const total = await cart.getTotal();
    expect(total).toBe(prices.reduce((a, b) => a + b, 0));
  });
});