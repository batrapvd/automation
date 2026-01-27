import { test, expect } from '../../src/fixtures/test-fixtures';

/**
 * End-to-End User Journey Tests
 * Complete user flows testing registration, login, and dashboard interactions
 */
test.describe('E2E User Journey', () => {

    /**
     * Complete user journey: Register -> Login -> Dashboard -> Logout
     */
    test('should complete full user registration and login journey', async ({
        registerPage,
        loginPage,
        dashboardPage,
        testData
    }) => {
        // Generate unique test data
        const userData = testData.generateValidRegistrationData();

        // Step 1: Navigate to Register page
        await registerPage.navigate();
        expect(await registerPage.isOnRegisterPage()).toBe(true);

        // Step 2: Handle registration alert and register
        registerPage['page'].once('dialog', async dialog => {
            expect(dialog.message()).toContain('Đăng ký thành công');
            await dialog.accept();
        });

        await registerPage.register(userData);

        // Step 3: Verify redirected to login page
        await expect(registerPage['page']).toHaveURL(/login\.html/);

        // Step 4: Login with registered credentials
        // Note: Using demo credentials since there's no real backend
        await loginPage.login('user@example.com', 'password123');

        // Step 5: Verify redirected to dashboard
        await expect(loginPage['page']).toHaveURL(/dashboard\.html/);

        // Step 6: Verify user info on dashboard
        await dashboardPage.waitForPageLoad();
        expect(await dashboardPage.isOnDashboardPage()).toBe(true);
        expect(await dashboardPage.isUserLoggedIn()).toBe(true);

        // Step 7: Navigate through dashboard sections
        await dashboardPage.clickNavItem('Analytics');
        expect(await dashboardPage.isNavItemActive('Analytics')).toBe(true);

        await dashboardPage.clickNavItem('Projects');
        expect(await dashboardPage.isNavItemActive('Projects')).toBe(true);

        await dashboardPage.clickNavItem('Dashboard');
        expect(await dashboardPage.isNavItemActive('Dashboard')).toBe(true);

        // Step 8: Logout
        await dashboardPage.clickLogout();

        // Step 9: Verify redirected to login and session cleared
        await expect(dashboardPage['page']).toHaveURL(/login\.html/);
        expect(await dashboardPage.getLocalStorage('isLoggedIn')).toBeNull();
    });

    /**
     * Login -> Dashboard navigation and interaction
     */
    test('should navigate from login to dashboard and interact', async ({ loginPage, dashboardPage }) => {
        // Step 1: Navigate to login
        await loginPage.navigate();

        // Step 2: Login
        await loginPage.login('user@example.com', 'password123');

        // Step 3: Verify on dashboard
        await expect(loginPage['page']).toHaveURL(/dashboard\.html/);

        // Step 4: Verify dashboard elements
        expect(await dashboardPage.isSidebarVisible()).toBe(true);
        expect(await dashboardPage.isMainContentVisible()).toBe(true);
        expect(await dashboardPage.isStatsGridVisible()).toBe(true);
        expect(await dashboardPage.isActivityTableVisible()).toBe(true);

        // Step 5: Check user info displayed
        const userEmail = await dashboardPage.getUserEmail();
        expect(userEmail).toBe('user@example.com');
    });

    /**
     * Navigation between Login and Register pages
     */
    test('should navigate between login and register pages', async ({ loginPage, registerPage }) => {
        // Start at login
        await loginPage.navigate();
        expect(await loginPage.isOnLoginPage()).toBe(true);

        // Navigate to register
        await loginPage.clickRegisterLink();
        expect(await registerPage.isOnRegisterPage()).toBe(true);

        // Navigate back to login
        await registerPage.clickLoginLink();
        expect(await loginPage.isOnLoginPage()).toBe(true);
    });

    /**
     * Verify localStorage persistence across pages
     */
    test('should maintain session across page navigation', async ({ loginPage, dashboardPage }) => {
        // Login
        await loginPage.navigate();
        await loginPage.login('user@example.com', 'password123');

        // Verify localStorage set
        expect(await loginPage.getLocalStorage('isLoggedIn')).toBe('true');
        expect(await loginPage.getLocalStorage('userEmail')).toBe('user@example.com');

        // Navigate to dashboard directly
        await dashboardPage.navigate();

        // Verify session still valid
        expect(await dashboardPage.isUserLoggedIn()).toBe(true);
        expect(await dashboardPage.getLoggedInUserEmail()).toBe('user@example.com');
    });

    /**
     * Dashboard stat cards display and interaction
     */
    test('should display all dashboard statistics correctly', async ({ loginPage, dashboardPage }) => {
        // Setup: Login first
        await loginPage.navigate();
        await loginPage.login('user@example.com', 'password123');

        // Get all stats
        const stats = await dashboardPage.getAllStats();

        // Verify all 4 stats present
        expect(stats.length).toBe(4);

        // Verify specific values
        expect(stats.find(s => s.id === 'Users')?.value).toBe('1,234');
        expect(stats.find(s => s.id === 'Revenue')?.value).toBe('$45,678');
        expect(stats.find(s => s.id === 'Orders')?.value).toBe('892');
        expect(stats.find(s => s.id === 'Growth')?.value).toBe('+23%');
    });

    /**
     * Dashboard activity table data verification
     */
    test('should display activity table with all rows', async ({ loginPage, dashboardPage }) => {
        // Setup: Login first
        await loginPage.navigate();
        await loginPage.login('user@example.com', 'password123');

        // Get activity table data
        const rows = await dashboardPage.getActivityTableRows();

        // Verify at least 5 rows exist
        expect(rows.length).toBeGreaterThanOrEqual(5);

        // Verify first row data structure
        const firstRow = rows[0];
        expect(firstRow.id).toBe('#001');
        expect(firstRow.activity).toBe('Đăng nhập hệ thống');
        expect(firstRow.user).toBe('user@example.com');
        expect(firstRow.status).toBe('success');

        // Verify different statuses exist
        const statusTypes = [...new Set(rows.map(r => r.status))];
        expect(statusTypes.length).toBeGreaterThanOrEqual(2); // At least success and one other
    });

});
