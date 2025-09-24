# Sauce Demo • Playwright E2E & Smoke Suite

[![Playwright Tests](https://github.com/MagdalenaHernandez/SauceDemo-Playwright-E2E/actions/workflows/playwright.yml/badge.svg)](https://github.com/MagdalenaHernandez/SauceDemo-Playwright-E2E/actions/workflows/playwright.yml)

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
npm i
npx playwright install --with-deps
Create a .env

## 🏃‍➡️ Run
# full suite
npm test

# UI runner (great for debugging)
npm run test:ui

# smoke only (uses @smoke tag via PW_GREP)
npm run test:smoke

# open the last HTML report
npm run report
