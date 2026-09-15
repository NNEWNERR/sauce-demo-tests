import { defineConfig } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 1,
    workers: isCI ? '50%' : undefined,
    reporter: [['html', { open: 'never' }], [isCI ? 'github' : 'list']],
    globalSetup: './global.setup.ts',
    use: {
        baseURL: 'https://www.saucedemo.com',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        actionTimeout: 10_000,
    },
    expect: {
        timeout: 10_000,
        toHaveScreenshot: {
            // `threshold` is the per-pixel colour tolerance; it does nothing
            // about a handful of antialiased pixels shifting after a browser
            // upgrade. maxDiffPixelRatio is the knob for that — 0.5% of the
            // image absorbs rendering noise while still catching a moved
            // button or a missing block.
            maxDiffPixelRatio: 0.005,
            threshold: 0.2,
        },
    },
})