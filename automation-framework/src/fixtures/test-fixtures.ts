import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TestDataGenerator } from '../utils/TestDataGenerator';
import { WaitHelper } from '../utils/WaitHelper';
import { AssertionHelper } from '../utils/AssertionHelper';

/**
 * Custom fixtures extending Playwright's base test
 * Provides pre-initialized page objects and utilities
 */

// Define custom fixture types
type CustomFixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
    testData: typeof TestDataGenerator;
    waitHelper: WaitHelper;
    assertionHelper: AssertionHelper;
    authenticatedPage: Page;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
    /**
     * Login Page fixture
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * Register Page fixture
     */
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    /**
     * Dashboard Page fixture
     */
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    /**
     * Test Data Generator fixture
     */
    testData: async ({ }, use) => {
        await use(TestDataGenerator);
    },

    /**
     * Wait Helper fixture
     */
    waitHelper: async ({ page }, use) => {
        const waitHelper = new WaitHelper(page);
        await use(waitHelper);
    },

    /**
     * Assertion Helper fixture
     */
    assertionHelper: async ({ page }, use) => {
        const assertionHelper = new AssertionHelper(page);
        await use(assertionHelper);
    },

    /**
     * Pre-authenticated page fixture
     * Sets up localStorage with logged-in state before test
     */
    authenticatedPage: async ({ page }, use) => {
        // Navigate to any page first to set localStorage
        const baseUrl = process.env.BASE_URL || 'file:///Users/kieutb/Documents/automation/';
        await page.goto(`${baseUrl}login.html`);

        // Set up logged-in state
        await page.evaluate(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', 'user@example.com');
        });

        await use(page);

        // Cleanup after test
        await page.evaluate(() => {
            localStorage.clear();
        });
    },
});

/**
 * Export expect from Playwright
 */
export { expect } from '@playwright/test';

/**
 * Test with logged-in state
 * Use this for dashboard tests that require authentication
 */
export const authenticatedTest = test.extend<{ page: Page }>({
    page: async ({ page }, use) => {
        const baseUrl = process.env.BASE_URL || 'file:///Users/kieutb/Documents/automation/';
        await page.goto(`${baseUrl}login.html`);

        await page.evaluate(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', 'user@example.com');
        });

        await use(page);
    },
});
