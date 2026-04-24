import { expect } from '@playwright/test'
import { BasePage } from './BasePage'
import { SauceUser, SAUCE_PASSWORD } from '../types'

export class LoginPage extends BasePage {

  // ── Locators ─────────────────────────────────
  readonly usernameInput = this.page.locator('#user-name')
  readonly passwordInput = this.page.locator('#password')
  readonly loginBtn      = this.page.locator('#login-button')
  readonly errorMsg      = this.page.locator('[data-test="error"]')

  // ── Actions ──────────────────────────────────
  async loginAs(user: SauceUser, password = SAUCE_PASSWORD) {
    await this.usernameInput.fill(user)
    await this.passwordInput.fill(password)
    await this.loginBtn.click()
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/inventory/)
  }

  async expectError(message: string) {
    await expect(this.errorMsg).toBeVisible()
    await expect(this.errorMsg).toContainText(message)
  }

  async expectOnLoginPage() {
    await expect(this.loginBtn).toBeVisible()
    await expect(this.page).toHaveURL(/saucedemo\.com\/?$/)
  }
}