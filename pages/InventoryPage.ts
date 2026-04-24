import { expect } from '@playwright/test'
import { BasePage } from './BasePage'
import type { SortOption } from '../types'

export class InventoryPage extends BasePage {
  readonly items      = this.page.locator('.inventory_item')
  readonly sortSelect = this.page.locator('[data-test="product-sort-container"]')
  readonly cartBadge  = this.page.locator('.shopping_cart_badge')
  readonly cartIcon   = this.page.locator('.shopping_cart_link')

  async sortBy(option: SortOption) {
    await this.sortSelect.selectOption(option)
  }

  async addToCart(productName: string) {
    const item = this.items.filter({ hasText: productName })
    await item.getByRole('button', { name: /add to cart/i }).click()
  }

  async removeFromCart(productName: string) {
    const item = this.items.filter({ hasText: productName })
    await item.getByRole('button', { name: /remove/i }).click()
  }

  async goToCart() {
    await this.cartIcon.click()
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents()
    return texts.map(t => parseFloat(t.replace('$', '')))
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents()
  }

  async expectCartCount(n: number) {
    if (n === 0) {
      await expect(this.cartBadge).not.toBeVisible()
    } else {
      await expect(this.cartBadge).toHaveText(String(n))
    }
  }

  async expectOnInventoryPage() {
    await expect(this.page).toHaveURL(/inventory/)
    await expect(this.items.first()).toBeVisible()
  }
}