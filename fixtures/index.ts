import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from 'pages/InventoryPage'
import { CartPage } from 'pages/CartPage'
import { CheckoutPage } from 'pages/CheckoutPage'

type Fixtures = {
  loginPage: LoginPage
  authenticatedPage: LoginPage
  inventoryPage: InventoryPage
  cartPage: CartPage
  checkoutPage: CheckoutPage
}

export const test = base.extend<Fixtures>({

  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page)
    await lp.goto('/')
    await use(lp)
  },

  authenticatedPage: async ({ browser }, use) => {
    const ctx = await browser.newContext({ storageState: 'auth/standard.json' })
    const page = await ctx.newPage()
    const lp = new LoginPage(page)
    await use(lp)
    await ctx.close()
  },

  inventoryPage: async ({ browser }, use) => {
    const ctx = await browser.newContext({ storageState: 'auth/standard.json' })
    const page = await ctx.newPage()
    const inv = new InventoryPage(page)
    await inv.goto('/inventory.html')
    await use(inv)
    await ctx.close()
  },

  cartPage: async ({ browser }, use) => {
  const ctx  = await browser.newContext({ storageState: 'auth/standard.json' })
  const page = await ctx.newPage()
  const cart = new CartPage(page)
  await use(cart)
  await ctx.close()
},

checkoutPage: async ({ browser }, use) => {
  const ctx = await browser.newContext({ storageState: 'auth/standard.json' })
  const pg  = await ctx.newPage()
  await use(new CheckoutPage(pg))
  await ctx.close()
},

})

export { expect } from '@playwright/test'