import { test, expect } from '../fixtures'
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'

test.describe('Cart & Checkout', () => {

    test('remove item in cart empties it', async ({ browser }) => {
        const ctx = await browser.newContext({ storageState: 'auth/standard.json' })
        const page = await ctx.newPage()
        const inv = new InventoryPage(page)
        const cart = new CartPage(page)
        await inv.goto('/inventory.html')
        await inv.addToCart('Sauce Labs Backpack')
        await inv.goToCart()
        await cart.expectItemInCart('Sauce Labs Backpack')
        await cart.removeItem('Sauce Labs Backpack')
        await cart.expectCartEmpty()
        await ctx.close()
    })

    test('@smoke complete checkout flow', async ({ browser }) => {
        const ctx = await browser.newContext({ storageState: 'auth/standard.json' })
        const page = await ctx.newPage()
        const inv = new InventoryPage(page)
        const cart = new CartPage(page)
        const checkout = new CheckoutPage(page)
        await inv.goto('/inventory.html')
        await inv.addToCart('Sauce Labs Backpack')
        await inv.goToCart()
        await cart.proceedToCheckout()
        await checkout.fillInfo({ firstName: 'Test', lastName: 'User', zipCode: '12345' })
        await checkout.finish()
        await checkout.expectOrderComplete()
        await ctx.close()
    })

    test('checkout requires first name', async ({ browser }) => {
        const ctx = await browser.newContext({ storageState: 'auth/standard.json' })
        const page = await ctx.newPage()
        const inv = new InventoryPage(page)
        const cart = new CartPage(page)
        const co = new CheckoutPage(page)
        await inv.goto('/inventory.html')
        await inv.addToCart('Sauce Labs Backpack')
        await inv.goToCart()
        await cart.proceedToCheckout()
        await co.continueBtn.click()
        await expect(page.locator('[data-test="error"]')).toContainText('First Name is required')
        await ctx.close()
    })

})