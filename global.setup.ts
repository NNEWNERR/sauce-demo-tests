import { chromium, FullConfig } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import fs from 'fs'

async function saveSession(loginPage: LoginPage, user: 'standard_user', path: string) {
  await loginPage.goto('/')
  await loginPage.loginAs(user)
  await loginPage.expectLoggedIn()
  await loginPage.page.context().storageState({ path })
}

async function globalSetup(config: FullConfig) {
  if (!fs.existsSync('auth')) fs.mkdirSync('auth')

  const browser = await chromium.launch()
  const ctx     = await browser.newContext({ baseURL: config.projects[0]?.use?.baseURL ?? 'https://www.saucedemo.com' })
  const page    = await ctx.newPage()
  const loginPage = new LoginPage(page)

  await saveSession(loginPage, 'standard_user', 'auth/standard.json')

  await browser.close()
  console.log('✓ Auth setup complete')
}

export default globalSetup