import { defineConfig } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: isCI ? '50%' : undefined,
    reporter: [['html', { open: 'never' }], [isCI ? 'github' : 'list']],
    globalSetup: './global.setup.ts',
    use: {
        baseURL: 'https://www.saucedemo.com',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        actionTimeout: 5_000,
    },
    expect: { timeout: 10_000 },
})