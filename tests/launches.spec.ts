import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {

  await page.goto("/")
  // Expect title to contain app name.
  await expect(page).toHaveTitle(/Ibuki/);
});