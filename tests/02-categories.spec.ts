import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { categories as expectedCategories } from "../utils/testData";

test.describe("Categorías", () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });

  test("Existen categorías Phones, Laptops, Monitors", async ({ page }) => {
    const home = new HomePage(page);
    await home.expectCategories(expectedCategories as unknown as string[]);
  });

  test("Contar número de cards en la página", async ({ page }) => {
    // Navegar a la página
    const home = new HomePage(page);

    for (const cat of expectedCategories) {
      await home.openCategory(cat);
      await page.waitForSelector(".card");

      // Contar las cards
      const cardCount = await page.locator(".card").count();

      // Verificar que hay al menos una card
      expect(cardCount).toBeGreaterThan(0);
    }
  });
});
