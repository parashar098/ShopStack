import { test, expect } from '@playwright/test';

test('home hero shows tech banner', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const img = await page.locator('img[src="/tech-banner.svg"]');
  await expect(img).toHaveCount(1);
});
