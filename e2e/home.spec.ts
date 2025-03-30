import { test, expect } from '@playwright/test';

test('calculator page loads and functions correctly', async ({ page }) => {
  // Listen to console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Console Error: ${msg.text()}`);
    }
  });

  await page.goto('http://localhost:5173/');
  
  // Check title and main heading
  await expect(page).toHaveTitle(/Savings Calculator 2025/);
  await expect(page.getByRole('heading', { name: /SAVINGS AND SIZING CALCULATOR/i })).toBeVisible();
  
  // Check instruction sections
  await expect(page.getByText(/How to use the calculator/)).toBeVisible();
  await expect(page.getByText(/What to do with your results/)).toBeVisible();
  await expect(page.getByText(/Enter your information in the boxes below/)).toBeVisible();
  
  // Check calculator mode
  await expect(page.getByLabel(/Savings Mode/)).toBeVisible();
  
  // Check heat source selector
  const heatSourceSelect = page.getByRole('combobox', { name: /What else are you heating?/i });
  await expect(heatSourceSelect).toBeVisible();
  
  // Check for home and water heater sections that are added by default
  await expect(page.getByText(/home/i, { exact: false })).toBeVisible();
  await expect(page.getByText(/water heater/i, { exact: false })).toBeVisible();
  
  // Test mode switch
  const modeSwitch = page.getByRole('switch', { name: /Savings Mode/i });
  await expect(modeSwitch).toBeVisible();
  await modeSwitch.click();
  await expect(page.getByText(/Sizing Mode/)).toBeVisible();
}); 