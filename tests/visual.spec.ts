import { test, expect } from '../fixtures'
import { InventoryPage } from '../pages/InventoryPage'

test.describe('Visual regression', () => {

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