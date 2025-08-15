import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 60_000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports', open: 'never' }]
  ],
  use: {
    baseURL: 'https://www.demoblaze.com/',
    //headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } }
    //{ name: 'Firefox', use: { ...devices['Desktop Firefox'] } }
  ]
});