import { test, expect } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Savings Calculator 2025/);

  // Expect the heading to be visible
  await expect(page.getByRole('heading', { name: /Savings Calculator 2025/i })).toBeVisible();
  
  // Expect the subtitle to be visible
  await expect(page.getByText(/Plan your financial future/i)).toBeVisible();
}); 