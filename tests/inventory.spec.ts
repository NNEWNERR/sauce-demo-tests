import { test, expect } from '../fixtures'

test.describe('Inventory', () => {

  test('@smoke sort by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi')
    const prices = await inventoryPage.getPrices()
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })

  test('add product updates cart badge', async ({ inventoryPage }) => {
    await inventoryPage.expectCartCount(0)
    await inventoryPage.addToCart('Sauce Labs Backpack')
    await inventoryPage.expectCartCount(1)
    await inventoryPage.addToCart('Sauce Labs Bike Light')
    await inventoryPage.expectCartCount(2)
  })

  test('remove product decreases cart count', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack')
    await inventoryPage.expectCartCount(1)
    await inventoryPage.removeFromCart('Sauce Labs Backpack')
    await inventoryPage.expectCartCount(0)
  })

})