// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js', // Matches all test files with .spec.js suffix
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Set headless mode based on environment (default: true for CI)
    headless: true,
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup', 
      testMatch: '**/*.spec.js', // Matches all tests
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json', // Path to storage state, persists authentication
        args: ['--disable-blink-features=AutomationControlled'], 
      },
      dependencies: ['setup'], // Ensure the setup project is executed first
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        args: ['--disable-blink-features=AutomationControlled'], 
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        args: ['--disable-blink-features=AutomationControlled'], // Add the flag here
      },
    },
  ],
});
