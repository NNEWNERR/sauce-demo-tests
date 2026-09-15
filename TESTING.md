# Test Strategy — Sauce Demo Automation Suite

## 1. Objective
ตรวจสอบว่า critical user flows ของ Sauce Demo ทำงานถูกต้อง สม่ำเสมอ
และเข้าถึงได้ (accessible) ทุกครั้งที่มีการ deploy

## 2. Scope

### In scope
- Login/logout (all user types)
- Product list: display, sorting
- Cart: add, remove, count
- Checkout: 3-step flow, validation
- Error states + form validation
- WCAG 2.0 AA accessibility
- Visual regression (key pages + mobile)

### Out of scope
- Payment processing backend
- Performance/load testing
- Security/penetration testing
- Cross-browser (Firefox, Safari) — อยู่ใน roadmap
- Admin functionality

## 3. Test Pyramid

| Layer | % | Count | Tool |
|-------|---|-------|------|
| E2E (@smoke) | 20% | 3 | Playwright |
| Integration | 50% | 8 | Playwright |
| Unit/Visual/A11y | 30% | 5 | Playwright + axe-core |

เลือก Playwright เพราะ: built-in auto-wait, TypeScript support,
single tool ครอบคลุม UI + API + visual + accessibility

## 4. Risk Matrix

| Area | Risk | Mitigation |
|------|------|------------|
| Checkout flow | HIGH | @smoke test, retries: 2, alert on fail |
| Login auth | HIGH | test all user types + error states |
| Cart operations | MED | test add/remove/badge count |
| Product sorting | MED | assert sorted array programmatically |
| Visual UI | LOW | screenshot baseline, threshold 0.2% |
| Accessibility | LOW | axe-core WCAG2AA scan all main pages |

## 5. Flaky Test Prevention
- ห้ามใช้ waitForTimeout() — ใช้ auto-retry assertions แทน
- Factory data: unique per test run (Faker.js)
- storageState: login ครั้งเดียว inject ทุก test
- Detect ด้วย: npx playwright test --repeat-each=5
- Quarantine: test ที่ flaky ย้ายเข้า test.skip + TODO

## 6. Metrics (targets)

| Metric | Target | Why |
|--------|--------|-----|
| CI pass rate | > 95% | ต่ำกว่า = systematic issues |
| Flaky rate | < 2% | สูงกว่า = ทีม stop trusting CI |
| Full suite time | < 5 min | นานกว่า = developer skip |
| @smoke time | < 60s | ต้องเร็วพอก่อน deploy |
| Critical path coverage | 100% | login + checkout ต้อง test เสมอ |
| A11y violations | 0 | ยกเว้น documented known issues |

## 7. CI/CD Pipeline
push → @smoke (60s) → fail fast
PR   → full suite parallel → block merge if fail

## 8. Tool Stack
- Framework: Playwright 1.x + TypeScript
- Pattern: Page Object Model (3-layer)
- A11y: @axe-core/playwright (WCAG 2.0 AA)
- CI: GitHub Actions
- Reporting: HTML report (artifact)