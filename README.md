# sauce-demo-tests

[![Playwright Tests](https://github.com/USERNAME/sauce-demo-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/USERNAME/sauce-demo-tests/actions)

## Stack
- **Playwright** + **TypeScript** — E2E automation
- **Page Object Model** — BasePage → LoginPage, InventoryPage, CartPage, CheckoutPage
- **axe-core** — WCAG 2.0 AA accessibility testing
- **GitHub Actions** — CI/CD pipeline

## Test coverage (16 tests)
| File | Tests | Coverage |
|------|-------|----------|
| login.spec.ts    | 4 | auth flow, error states |
| inventory.spec.ts| 3 | sort, add/remove cart |
| cart.spec.ts     | 3 | cart ops, checkout E2E |
| visual.spec.ts   | 3 | screenshot regression |
| a11y.spec.ts     | 3 | WCAG 2.0 AA + keyboard |

## Run locally
```bash
npm ci
npx playwright install chromium
npx playwright test
npx playwright test --grep @smoke
npx playwright test --update-snapshots
npx playwright show-report
```