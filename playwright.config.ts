import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const baseURL = (process.env.BASE_URL ?? 'https://www.saucedemo.com/').replace(/(?<!\/)$/, '/');
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  forbidOnly: isCI,
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : undefined,
  grep: process.env.PW_GREP ? new RegExp(process.env.PW_GREP) : undefined,
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL,
    testIdAttribute: 'data-test',
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: isCI ? 'only-on-failure' : 'only-on-failure',
    video: isCI ? 'retain-on-failure' : 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ]
});