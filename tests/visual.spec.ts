import { test, expect } from '../fixtures'
import { InventoryPage } from '../pages/InventoryPage'

/**
 * Screenshot baselines are OS-specific — Playwright suffixes them (-win32) and
 * font rasterisation differs on the Linux CI runner, so CI skips this suite via
 * `--grep-invert @visual`. Regenerate with `npm run test:update-snapshots`
 * after a browser upgrade.
 */
test.describe('Visual regression', { tag: '@visual' }, () => {

  test('login page matches baseline', async ({ loginPage }) => {
    await expect(loginPage.page).toHaveScreenshot('login-page.png', {
      fullPage: true, animations: 'disabled', threshold: 0.2,
    })
  })

  test('product card matches baseline', async ({ browser }) => {
    const ctx  = await browser.newContext({ storageState: 'auth/standard.json' })
    const page = await ctx.newPage()
    const inv  = new InventoryPage(page)
    await inv.goto('/inventory.html')
    await expect(inv.items.first()).toHaveScreenshot('product-card.png', {
      animations: 'disabled', threshold: 0.2,
    })
    await ctx.close()
  })

  test('inventory page — mobile viewport', async ({ browser }) => {
    const ctx = await browser.newContext({
      storageState: 'auth/standard.json',
      viewport: { width: 375, height: 667 },
    })
    const page = await ctx.newPage()
    await page.goto('/inventory.html')
    await expect(page).toHaveScreenshot('inventory-mobile.png', {
      fullPage: true, animations: 'disabled', threshold: 0.2,
    })
    await ctx.close()
  })

})