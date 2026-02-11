import { test, expect } from '@playwright/test';
import { TEST_CARDS, TEST_CUSTOMER } from '../fixtures/test-data';

test.describe('Conekta Payment Errors', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('should show error for declined card', async ({ page }) => {
    await page.goto('/encuentros/marzo-2026-precios');
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => typeof (window as any).Conekta !== 'undefined', {
      timeout: 15000,
    });

    // Open deposit modal
    await page.getByRole('button', { name: /Reservar Ahora/i }).click();
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });

    // Fill customer info
    await page.fill('input[name="name"]', TEST_CUSTOMER.name);
    await page.fill('input[name="email"]', TEST_CUSTOMER.email);

    // Fill DECLINED card details
    await page.fill('input[name="cardNumber"]', TEST_CARDS.DECLINED.number);
    await page.fill('input[name="cardMonth"]', TEST_CARDS.DECLINED.month);
    await page.fill('input[name="cardYear"]', TEST_CARDS.DECLINED.year);
    await page.fill('input[name="cardCvc"]', TEST_CARDS.DECLINED.cvc);

    // Submit payment
    await page.getByRole('button', { name: /Invertir/i }).click();

    // Wait for error message
    const errorContainer = page.locator('.bg-red-500\\/20');
    await expect(errorContainer).toBeVisible({ timeout: 30000 });

    // Should NOT redirect to success page
    await expect(page).not.toHaveURL(/\/pago-exitoso/);
  });

  test('should validate required fields - empty form', async ({ page }) => {
    await page.goto('/encuentros/febrero-2026-precios');
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => typeof (window as any).Conekta !== 'undefined', {
      timeout: 15000,
    });

    // Open modal
    await page.getByRole('button', { name: /Reservar Ahora/i }).click();
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });

    // Try to submit empty form
    await page.getByRole('button', { name: /Invertir/i }).click();

    // Form should not submit (HTML5 validation)
    // Should still be on the same page with modal open
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  test('should disable submit button while processing', async ({ page }) => {
    await page.goto('/encuentros/febrero-2026-precios');
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => typeof (window as any).Conekta !== 'undefined', {
      timeout: 15000,
    });

    // Open modal
    await page.getByRole('button', { name: /Reservar Ahora/i }).click();
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });

    // Fill form
    await page.fill('input[name="name"]', TEST_CUSTOMER.name);
    await page.fill('input[name="email"]', TEST_CUSTOMER.email);
    await page.fill('input[name="cardNumber"]', TEST_CARDS.SUCCESS.number);
    await page.fill('input[name="cardMonth"]', TEST_CARDS.SUCCESS.month);
    await page.fill('input[name="cardYear"]', TEST_CARDS.SUCCESS.year);
    await page.fill('input[name="cardCvc"]', TEST_CARDS.SUCCESS.cvc);

    // Click submit
    const submitButton = page.getByRole('button', { name: /Invertir/i });
    await submitButton.click();

    // Button should be disabled during processing
    await expect(submitButton).toBeDisabled();
    await expect(page.getByText('Procesando...')).toBeVisible();
  });

  test('should format card number with spaces', async ({ page }) => {
    await page.goto('/encuentros/febrero-2026-precios');
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => typeof (window as any).Conekta !== 'undefined', {
      timeout: 15000,
    });

    // Open modal
    await page.getByRole('button', { name: /Reservar Ahora/i }).click();
    await expect(page.locator('input[name="cardNumber"]')).toBeVisible({ timeout: 5000 });

    // Type card number
    const cardInput = page.locator('input[name="cardNumber"]');
    await cardInput.fill('4242424242424242');

    // Should be formatted with spaces
    await expect(cardInput).toHaveValue('4242 4242 4242 4242');
  });
});
