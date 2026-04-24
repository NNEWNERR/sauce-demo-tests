import { expect } from '@playwright/test'
import { BasePage } from './BasePage'
import type { CheckoutInfo } from '../types'

export class CheckoutPage extends BasePage {
  readonly firstNameInput = this.page.locator('[data-test="firstName"]')
  readonly lastNameInput  = this.page.locator('[data-test="lastName"]')
  readonly zipCodeInput   = this.page.locator('[data-test="postalCode"]')
  readonly continueBtn   = this.page.locator('[data-test="continue"]')
  readonly finishBtn     = this.page.locator('[data-test="finish"]')
  readonly successHeader = this.page.locator('.complete-header')

  async fillInfo(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName)
    await this.lastNameInput.fill(info.lastName)
    await this.zipCodeInput.fill(info.zipCode)
    await this.continueBtn.click()
  }

  async finish() {
    await this.finishBtn.click()
  }

  async expectOrderComplete() {
    await expect(this.successHeader).toHaveText('Thank you for your order!')
  }
}