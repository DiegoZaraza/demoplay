import { expect, Page } from '@playwright/test';

export async function acceptAlertAndGetText(page: Page): Promise<string> {
  return await new Promise<string>((resolve) => {
    page.once('dialog', async dialog => {
      const text = dialog.message();
      await dialog.accept();
      resolve(text);
    });
  });
}

export async function expectNoModalAppears(page: Page, selector: string, timeout = 3000) {
  await expect(page.locator(selector)).toHaveCount(0, { timeout });
}

async function countCards(page) {
    try {
        // Esperar a que las cards estén cargadas
        await page.waitForSelector('.card', { timeout: 5000 });
        
        // Contar las cards
        const count = await page.locator('.card').count();
        
        // Verificación adicional - obtener información de cada card
        const cards = await page.locator('.card').all();
        const cardDetails = [];
        
        for (let i = 0; i < cards.length; i++) {
            const title = await cards[i].locator('.card-title a').textContent();
            const price = await cards[i].locator('h5').textContent();
            cardDetails.push({ title: title.trim(), price: price.trim() });
        }
        
        console.log(`Total de cards encontradas: ${count}`);
        console.log('Detalles de las cards:', cardDetails);
        
        return { count, details: cardDetails };
    } catch (error) {
        console.error('Error al contar las cards:', error);
        return { count: 0, details: [] };
    }
}