import { test, expect } from '../fixtures'

test.describe('Login', () => {

  test('@smoke valid login navigates to inventory', async ({ loginPage }) => {
    await loginPage.loginAs('standard_user')
    await loginPage.expectLoggedIn()
    await expect(loginPage.page).toHaveTitle(/Swag Labs/)
  })

  test('locked user sees error message', async ({ loginPage }) => {
    await loginPage.loginAs('locked_out_user')
    await loginPage.expectError('locked out')
    await loginPage.expectOnLoginPage()
  })

  test('wrong password shows error', async ({ loginPage }) => {
    await loginPage.loginAs('standard_user', 'wrong_password')
    await loginPage.expectError('Username and password do not match')
  })

  test('empty username shows validation error', async ({ loginPage }) => {
    await loginPage.loginBtn.click()
    await loginPage.expectError('Username is required')
  })

})