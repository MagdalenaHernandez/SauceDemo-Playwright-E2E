# Sauce Demo • Playwright E2E & Smoke Suite

[![Playwright Tests](https://github.com/MagdalenaHernandez/SauceDemo-Playwright-E2E/actions/workflows/playwright.yml/badge.svg)](https://github.com/MagdalenaHernandez/SauceDemo-Playwright-E2E/actions/workflows/playwright.yml)
![License](https://img.shields.io/github/license/MagdalenaHernandez/SauceDemo-Playwright-E2E)


Playwright tests for https://www.saucedemo.com using a clean Page Object Model. Built to be easy to read, run, and review.
---
## 📦 What’s included
- **Auth:** standard user login; locked-out user error
- **Smoke:** add/remove item updates cart badge (**@smoke**)
- **Cart:** item presence, quantity, continue shopping
- **Sorting:**  (name A↔Z, price low↔high)

## 🔧 Stack
- Playwright Test (TypeScript), Node 20+
- POM structure
- HTML report
- Screenshots on failure locally; traces & videos on CI failures

## ⚙️ Setup
- npm i
- npx playwright install --with-deps
- Create a .env (or copy .env.example)

## 🏃‍➡️ Run
- **full suite:** npm test
- **UI runner:** npm run test:ui
- **smoke only:** npm run test:smoke
- **open the last HTML report:** npm run report

## 🤖 CI (GitHub Actions)
- Triggers on push to main, on pull requests, and manual runs via Run workflow
- Secrets: STANDARD_PASSWORD — injected as an env var for tests
- Artifacts:
    - Always: playwright-report (HTML report)
    - On failures: test-results/** (traces, screenshots, videos)

