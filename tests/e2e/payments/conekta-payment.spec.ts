import { test, expect } from '@playwright/test';
import { TEST_CARDS, TEST_CUSTOMER, PAYMENT_PRODUCTS } from '../fixtures/test-data';

test.describe('Conekta Payment Flow', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('should display pricing page correctly', async ({ page }) => {
    await page.goto('/encuentros/febrero-2026-precios');
    await page.waitForLoadState('networkidle');

    // Verify pricing packages are displayed
    await expect(page.getByText('$3,000')).toBeVisible();
    await expect(page.getByText('$7,100')).toBeVisible();
    await expect(page.getByText('$10,200')).toBeVisible();
  });

  test('should open payment modal for deposit', async ({ page }) => {
    await page.goto('/encuentros/febrero-2026-precios');
    await page.waitForLoadState('networkidle');

    // Wait for Conekta.js to load
    await page.waitForFunction(() => typeof (window as any).Conekta !== 'undefined', {
      timeout: 15000,
    });

    // Click deposit button
    await page.getByRole('button', { name: /Reservar Ahora/i }).click();

    // Verify modal content
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="cardNumber"]')).toBeVisible();
  });

  test('should process successful payment with test card', async ({ page }) => {
    await page.goto('/encuentros/febrero-2026-precios');
    await page.waitForLoadState('networkidle');

    // Wait for Conekta.js
    await page.waitForFunction(() => typeof (window as any).Conekta !== 'undefined', {
      timeout: 15000,
    });

    // Open deposit modal
    await page.getByRole('button', { name: /Reservar Ahora/i }).click();
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });

    // Fill customer info
    await page.fill('input[name="name"]', TEST_CUSTOMER.name);
    await page.fill('input[name="email"]', TEST_CUSTOMER.email);
    await page.fill('input[name="phone"]', TEST_CUSTOMER.phone);

    // Fill card details
    await page.fill('input[name="cardNumber"]', TEST_CARDS.SUCCESS.number);
    await page.fill('input[name="cardMonth"]', TEST_CARDS.SUCCESS.month);
    await page.fill('input[name="cardYear"]', TEST_CARDS.SUCCESS.year);
    await page.fill('input[name="cardCvc"]', TEST_CARDS.SUCCESS.cvc);

    // Submit payment
    await page.getByRole('button', { name: /Invertir/i }).click();

    // Wait for processing
    await expect(page.getByText('Procesando...')).toBeVisible({ timeout: 5000 });

    // Wait for success message
    await expect(page.getByText('Pago Exitoso')).toBeVisible({ timeout: 30000 });

    // Verify redirect to success page
    await page.waitForURL(/\/pago-exitoso/, { timeout: 10000 });
  });

  test('should close modal when clicking cancel', async ({ page }) => {
    await page.goto('/encuentros/febrero-2026-precios');
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => typeof (window as any).Conekta !== 'undefined', {
      timeout: 15000,
    });

    // Open modal
    await page.getByRole('button', { name: /Reservar Ahora/i }).click();
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });

    // Click cancel
    await page.getByRole('button', { name: /Cancelar/i }).click();

    // Verify modal is closed
    await expect(page.locator('input[name="cardNumber"]')).not.toBeVisible();
  });
});
