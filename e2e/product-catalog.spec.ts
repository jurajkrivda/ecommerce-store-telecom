import { test, expect } from '@playwright/test';

test.describe('Product Catalog E2E', () => {
  test('should display products and allow price filtering', async ({
    page,
  }) => {
    // Navigate to homepage
    await page.goto('/');

    // Check page title and heading
    await expect(page).toHaveTitle(/Telecom/);
    await expect(
      page.getByRole('heading', { name: 'E-commerce Product Catalog' })
    ).toBeVisible();

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-grid"]', {
      timeout: 10000,
    });

    // Check that products are displayed
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards).toHaveCount(20); // FakeStore API returns 20 products

    // Check that product count is displayed
    await expect(page.getByText('Showing 20 of 20 products')).toBeVisible();

    // Test price filtering
    const minPriceInput = page.getByPlaceholder('Min');
    const maxPriceInput = page.getByPlaceholder('Max');

    // Set price filter: $10-$50
    await minPriceInput.fill('10');
    await maxPriceInput.fill('50');
    await maxPriceInput.press('Enter');

    // Wait for filtering to apply
    await page.waitForTimeout(500);

    // Check that products are filtered
    const filteredProducts = page.locator('[data-testid="product-card"]');
    const filteredCount = await filteredProducts.count();

    // Verify filter results text is updated
    await expect(
      page.getByText(`Showing ${filteredCount} of 20 products`)
    ).toBeVisible();
    await expect(
      page.getByText('(filtered by price: $10.00 - $50.00)')
    ).toBeVisible();

    // Verify all visible products are within price range
    const priceElements = page.locator('[data-testid="product-price"]');
    const priceCount = await priceElements.count();

    for (let i = 0; i < priceCount; i++) {
      const priceText = await priceElements.nth(i).textContent();
      const price = parseFloat(priceText?.replace('$', '') || '0');
      expect(price).toBeGreaterThanOrEqual(10);
      expect(price).toBeLessThanOrEqual(50);
    }

    // Test clear filters
    const clearFiltersButton = page.getByRole('button', {
      name: 'Clear',
    });
    if (await clearFiltersButton.isVisible()) {
      await clearFiltersButton.click();
      await page.waitForTimeout(500);
      await expect(page.getByText('Showing 20 of 20 products')).toBeVisible();
    }
  });

  test('should navigate to product detail page', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-grid"]', {
      timeout: 10000,
    });

    // Click on first product's "View Details" button
    const firstProductButton = page
      .locator('[data-testid="product-card"]')
      .first()
      .getByRole('link', { name: 'View Details' });
    await firstProductButton.click();

    // Check we're on product detail page
    await expect(page).toHaveURL(/\/products\/\d+/);

    // Check product detail elements are present
    await expect(page.locator('[data-testid="product-image"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-price"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="product-description"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="product-rating"]')).toBeVisible();

    // Check back to home link works
    const backLink = page.getByRole('link', { name: '← Back to Products' });
    await expect(backLink).toBeVisible();
    await backLink.click();

    await expect(page).toHaveURL('/');
  });

  test('should handle product not found', async ({ page }) => {
    // Navigate to non-existent product
    await page.goto('/products/999999');

    // Check 404 page is displayed
    await expect(
      page.getByRole('heading', { name: 'Product Not Found' })
    ).toBeVisible();
    await expect(
      page.getByText('The product you are looking for does not exist.')
    ).toBeVisible();

    // Check back to home link
    const backLink = page.getByRole('link', { name: 'Go back to products' });
    await expect(backLink).toBeVisible();
    await backLink.click();

    await expect(page).toHaveURL('/');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to homepage
    await page.goto('/');

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-grid"]', {
      timeout: 10000,
    });

    // Check that product grid adapts to mobile (should be single column)
    const productGrid = page.locator('[data-testid="product-grid"]');
    await expect(productGrid).toHaveClass(/grid-cols-1/);

    // Check that price filter is still functional on mobile
    const minPriceInput = page.getByPlaceholder('Min');
    const maxPriceInput = page.getByPlaceholder('Max');

    await expect(minPriceInput).toBeVisible();
    await expect(maxPriceInput).toBeVisible();

    // Test price filtering on mobile
    await minPriceInput.fill('20');
    await maxPriceInput.fill('30');
    await maxPriceInput.press('Enter');

    await page.waitForTimeout(500);

    // Verify filtering works on mobile
    const filteredCount = await page
      .locator('[data-testid="product-card"]')
      .count();
    await expect(
      page.getByText(`Showing ${filteredCount} of 20 products`)
    ).toBeVisible();
  });
});
