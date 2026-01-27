import { test, expect } from '../../src/fixtures/test-fixtures';

/**
 * Dashboard Page Tests - Positive Test Cases
 * Tests based on manual test cases: TC_DASH_001-011
 */
test.describe('Dashboard Page - Positive Tests', () => {

    test.beforeEach(async ({ dashboardPage }) => {
        // Set up logged-in session
        await dashboardPage.navigate();
        await dashboardPage.setupLoggedInSession('user@example.com');
        await dashboardPage.reload();
    });

    /**
     * TC_DASH_001: Dashboard hiển thị đầy đủ thông tin user từ localStorage
     */
    test('TC_DASH_001: should display user information from localStorage', async ({ dashboardPage }) => {
        const expectedEmail = 'user@example.com';

        // Assert - User info displayed correctly
        const userInfo = await dashboardPage.getUserInfo();

        expect(userInfo.email).toBe(expectedEmail);
        expect(userInfo.name).toBe('user'); // Extracted from email
        expect(userInfo.avatar).toBe('U'); // First letter of email
    });

    /**
     * TC_DASH_002: Dashboard hiển thị stats cards
     */
    test('TC_DASH_002: should display all stats cards', async ({ dashboardPage }) => {
        // Assert - Stats grid visible
        expect(await dashboardPage.isStatsGridVisible()).toBe(true);

        // Assert - 4 stat cards visible
        expect(await dashboardPage.getStatsCardCount()).toBe(4);

        // Assert - Each stat has value and label
        const stats = await dashboardPage.getAllStats();
        expect(stats.length).toBe(4);

        for (const stat of stats) {
            expect(stat.value).toBeTruthy();
            expect(stat.label).toBeTruthy();
        }
    });

    /**
     * TC_DASH_003: Dashboard hiển thị activity table
     */
    test('TC_DASH_003: should display activity table with data', async ({ dashboardPage }) => {
        // Assert - Activity table visible
        expect(await dashboardPage.isActivityTableVisible()).toBe(true);

        // Assert - Table has rows
        const rowCount = await dashboardPage.getActivityRowCount();
        expect(rowCount).toBeGreaterThan(0);

        // Assert - Table rows have data
        const rows = await dashboardPage.getActivityTableRows();
        expect(rows.length).toBeGreaterThan(0);

        // Verify first row has all fields
        const firstRow = rows[0];
        expect(firstRow.id).toBeTruthy();
        expect(firstRow.activity).toBeTruthy();
        expect(firstRow.user).toBeTruthy();
        expect(firstRow.time).toBeTruthy();
        expect(['success', 'pending', 'error']).toContain(firstRow.status);
    });

    /**
     * TC_DASH_004: Navigation menu hiển thị và hoạt động
     */
    test('TC_DASH_004: should display navigation menu and handle clicks', async ({ dashboardPage }) => {
        // Assert - Sidebar visible
        expect(await dashboardPage.isSidebarVisible()).toBe(true);

        // Assert - Dashboard nav item active by default
        expect(await dashboardPage.isNavItemActive('Dashboard')).toBe(true);

        // Click Analytics
        await dashboardPage.clickNavItem('Analytics');
        expect(await dashboardPage.isNavItemActive('Analytics')).toBe(true);
        expect(await dashboardPage.isNavItemActive('Dashboard')).toBe(false);

        // Click Projects
        await dashboardPage.clickNavItem('Projects');
        expect(await dashboardPage.isNavItemActive('Projects')).toBe(true);

        // Click Settings
        await dashboardPage.clickNavItem('Settings');
        expect(await dashboardPage.isNavItemActive('Settings')).toBe(true);

        // Click back to Dashboard
        await dashboardPage.clickNavItem('Dashboard');
        expect(await dashboardPage.isNavItemActive('Dashboard')).toBe(true);
    });

    /**
     * TC_DASH_005: Logout button hoạt động
     */
    test('TC_DASH_005: should logout when clicking logout button', async ({ dashboardPage }) => {
        // Act - Click logout
        await dashboardPage.clickLogout();

        // Assert - Redirected to login page
        await expect(dashboardPage['page']).toHaveURL(/login\.html/);
    });

    /**
     * TC_DASH_006: Logout xóa session
     */
    test('TC_DASH_006: should clear session on logout', async ({ dashboardPage }) => {
        // Act - Click logout
        await dashboardPage.clickLogout();

        // Assert - Session cleared
        const isLoggedIn = await dashboardPage.getLocalStorage('isLoggedIn');
        const userEmail = await dashboardPage.getLocalStorage('userEmail');

        expect(isLoggedIn).toBeNull();
        expect(userEmail).toBeNull();
    });

    /**
     * TC_DASH_007: Welcome message hiển thị
     */
    test('TC_DASH_007: should display welcome message', async ({ dashboardPage }) => {
        // Assert - Welcome message visible
        const welcomeMessage = await dashboardPage.getWelcomeMessage();
        expect(welcomeMessage).toContain('Chào mừng trở lại');
    });

    /**
     * TC_DASH_008: Verify main content area
     */
    test('TC_DASH_008: should display main content area', async ({ dashboardPage }) => {
        // Assert - Main content visible
        expect(await dashboardPage.isMainContentVisible()).toBe(true);
    });

    /**
     * TC_DASH_009: Verify stat values are displayed
     */
    test('TC_DASH_009: should display stat values correctly', async ({ dashboardPage }) => {
        // Get individual stats
        const usersValue = await dashboardPage.getStatValue('Users');
        const revenueValue = await dashboardPage.getStatValue('Revenue');
        const ordersValue = await dashboardPage.getStatValue('Orders');
        const growthValue = await dashboardPage.getStatValue('Growth');

        // Assert - Values exist and match expected format
        expect(usersValue).toBe('1,234');
        expect(revenueValue).toBe('$45,678');
        expect(ordersValue).toBe('892');
        expect(growthValue).toBe('+23%');
    });

    /**
     * TC_DASH_010: Verify stat labels are displayed
     */
    test('TC_DASH_010: should display stat labels correctly', async ({ dashboardPage }) => {
        // Get labels
        const usersLabel = await dashboardPage.getStatLabel('Users');
        const revenueLabel = await dashboardPage.getStatLabel('Revenue');
        const ordersLabel = await dashboardPage.getStatLabel('Orders');
        const growthLabel = await dashboardPage.getStatLabel('Growth');

        // Assert - Labels match expected text
        expect(usersLabel).toBe('Tổng người dùng');
        expect(revenueLabel).toBe('Doanh thu');
        expect(ordersLabel).toBe('Đơn hàng');
        expect(growthLabel).toBe('Tăng trưởng');
    });

    /**
     * Additional: Verify activity table has correct headers
     */
    test('should display activity table with correct structure', async ({ dashboardPage }) => {
        // Get table rows
        const rows = await dashboardPage.getActivityTableRows();

        // Assert - At least 5 rows (as per HTML)
        expect(rows.length).toBeGreaterThanOrEqual(5);

        // Verify different status types exist
        const statuses = rows.map(r => r.status);
        expect(statuses).toContain('success');
    });

    /**
     * Additional: Verify page is on dashboard
     */
    test('should be on dashboard page', async ({ dashboardPage }) => {
        expect(await dashboardPage.isOnDashboardPage()).toBe(true);
    });

    /**
     * Additional: Verify user is logged in
     */
    test('should show user is logged in', async ({ dashboardPage }) => {
        expect(await dashboardPage.isUserLoggedIn()).toBe(true);
    });

});
