import { test, expect } from '../fixtures'
import AxeBuilder from '@axe-core/playwright'

async function checkA11y(page: any, extraDisabledRules: string[] = []) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .disableRules(['color-contrast', ...extraDisabledRules])
    .analyze()
  if (results.violations.length > 0) {
    console.log('Violations:', results.violations.map(v => `${v.id}: ${v.description}`))
  }
  expect(results.violations).toHaveLength(0)
}

test.describe('Accessibility', () => {

  test('login page has no a11y violations', async ({ loginPage }) => {
    await checkA11y(loginPage.page)
  })

  test('inventory page has no a11y violations', async ({ browser }) => {
    const ctx  = await browser.newContext({ storageState: 'auth/standard.json' })
    const page = await ctx.newPage()
    await page.goto('/inventory.html')
    // select-name: SauceDemo's sort dropdown has no <label> — known site defect
    await checkA11y(page, ['select-name'])
    await ctx.close()
  })

  test('login form keyboard navigable', async ({ loginPage }) => {
    await loginPage.page.keyboard.press('Tab')
    await expect(loginPage.usernameInput).toBeFocused()
    await loginPage.page.keyboard.press('Tab')
    await expect(loginPage.passwordInput).toBeFocused()
    await loginPage.page.keyboard.press('Tab')
    await expect(loginPage.loginBtn).toBeFocused()
    await loginPage.usernameInput.fill('standard_user')
    await loginPage.passwordInput.fill('secret_sauce')
    await loginPage.page.keyboard.press('Enter')
    await loginPage.expectLoggedIn()
  })

})