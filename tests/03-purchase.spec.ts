import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { purchaseData } from '../utils/testData';

const PRODUCT = 'Samsung galaxy s6';

test.describe('Flujo de compra', () => {
  test('Agregar al carrito y completar pedido', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.openCategory('Phones');
    await home.openProductByName(PRODUCT);

    const product = new ProductPage(page);
    await product.addToCart();

    const cart = new CartPage(page);
    await cart.open();

    const prices = await cart.getLinePrices();
    expect(prices.length).toBeGreaterThan(0);

    const total = await cart.getTotal();
    expect(total).toBe(prices.reduce((a, b) => a + b, 0));

    const receipt = await cart.placeOrder(purchaseData);
    expect(receipt).toMatch(/Id: \d+/i);
  });
});