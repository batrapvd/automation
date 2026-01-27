import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment-specific config
const env = process.env.ENV || 'sit';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    // Test directory
    testDir: './tests',

    // Test file pattern
    testMatch: '**/*.spec.ts',

    // Run tests in files in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 1,

    // Opt out of parallel tests on CI
    workers: process.env.CI ? 1 : 4,

    // Timeout for each test
    timeout: 30000,

    // Timeout for each assertion
    expect: {
        timeout: 5000,
    },

    // Reporter configuration
    reporter: [
        ['list'],
        ['html', { outputFolder: 'reports/html', open: 'never' }],
        ['json', { outputFile: 'reports/results.json' }],
        ['junit', { outputFile: 'reports/junit.xml' }],
    ],

    // Shared settings for all projects
    use: {
        // Base URL from environment
        baseURL: process.env.BASE_URL || 'file:///Users/kieutb/Documents/automation/',

        // Collect trace when retrying the failed test
        trace: 'on-first-retry',

        // Capture screenshot on failure
        screenshot: 'only-on-failure',

        // Record video on failure
        video: 'retain-on-failure',

        // Action timeout
        actionTimeout: 10000,

        // Navigation timeout
        navigationTimeout: 15000,

        // Viewport size
        viewport: { width: 1280, height: 720 },

        // Ignore HTTPS errors
        ignoreHTTPSErrors: true,

        // Locale
        locale: 'vi-VN',

        // Timezone
        timezoneId: 'Asia/Ho_Chi_Minh',
    },

    // Configure projects for different browsers
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
        {
            name: 'mobile',
            use: {
                ...devices['iPhone 13'],
            },
        },
        {
            name: 'tablet',
            use: {
                ...devices['iPad Pro 11'],
            },
        },
    ],

    // Output folder for test artifacts
    outputDir: 'reports/test-results',

    // Folder for test artifacts
    snapshotDir: 'reports/snapshots',
});
