import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  readonly items       = this.page.locator('.cart_item')
  readonly checkoutBtn = this.page.locator('[data-test="checkout"]')
  readonly continueBtn = this.page.locator('[data-test="continue-shopping"]')

  async removeItem(productName: string) {
    const item = this.items.filter({ hasText: productName })
    await item.getByRole('button', { name: /remove/i }).click()
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click()
  }

  async expectItemInCart(productName: string) {
    await expect(this.items.filter({ hasText: productName })).toBeVisible()
  }

  async expectCartEmpty() {
    await expect(this.items).toHaveCount(0)
  }
}