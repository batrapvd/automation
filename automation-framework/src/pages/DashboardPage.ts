import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { DashboardLocators, NavItemNames } from '../locators/DashboardLocators';
import { UserInfo, StatCard, ActivityRow, NavItem } from '../types';

/**
 * DashboardPage - Page Object for the Dashboard page
 * Handles all interactions with the dashboard
 */
export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Get the dashboard page URL
     */
    getPageUrl(): string {
        return `${this.baseUrl}dashboard.html`;
    }

    /**
     * Navigate to dashboard page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.getPageUrl());
        await this.waitForPageLoad();
    }

    // ============ User Info Methods ============

    /**
     * Get displayed user email
     */
    async getUserEmail(): Promise<string> {
        return await this.getElementText(DashboardLocators.userEmail);
    }

    /**
     * Get displayed user name
     */
    async getUserName(): Promise<string> {
        return await this.getElementText(DashboardLocators.userName);
    }

    /**
     * Get user avatar initial
     */
    async getUserAvatar(): Promise<string> {
        return await this.getElementText(DashboardLocators.userAvatar);
    }

    /**
     * Get complete user info
     */
    async getUserInfo(): Promise<UserInfo> {
        return {
            email: await this.getUserEmail(),
            name: await this.getUserName(),
            avatar: await this.getUserAvatar(),
        };
    }

    // ============ Navigation Methods ============

    /**
     * Click logout button
     */
    async clickLogout(): Promise<void> {
        await this.clickElement(DashboardLocators.logoutButton);
        await this.waitForPageLoad();
    }

    /**
     * Click navigation item by ID
     * @param navId - Navigation item ID
     */
    async clickNavItem(navId: 'Dashboard' | 'Analytics' | 'Projects' | 'Settings'): Promise<void> {
        const navLocators: Record<string, string> = {
            Dashboard: DashboardLocators.navDashboard,
            Analytics: DashboardLocators.navAnalytics,
            Projects: DashboardLocators.navProjects,
            Settings: DashboardLocators.navSettings,
        };
        await this.clickElement(navLocators[navId]);
    }

    /**
     * Check if navigation item is active
     * @param navId - Navigation item ID
     */
    async isNavItemActive(navId: 'Dashboard' | 'Analytics' | 'Projects' | 'Settings'): Promise<boolean> {
        const navLocators: Record<string, string> = {
            Dashboard: DashboardLocators.navDashboard,
            Analytics: DashboardLocators.navAnalytics,
            Projects: DashboardLocators.navProjects,
            Settings: DashboardLocators.navSettings,
        };
        return await this.hasClass(navLocators[navId], 'active');
    }

    /**
     * Get all navigation items
     */
    async getNavItems(): Promise<NavItem[]> {
        const items: NavItem[] = [];
        const navIds = ['Dashboard', 'Analytics', 'Projects', 'Settings'] as const;

        for (const navId of navIds) {
            items.push({
                id: navId,
                label: NavItemNames[navId.toLowerCase() as keyof typeof NavItemNames],
                icon: '',
                isActive: await this.isNavItemActive(navId),
            });
        }

        return items;
    }

    // ============ Stats Methods ============

    /**
     * Get stat value by card ID
     * @param statId - Stat card ID (Users, Revenue, Orders, Growth)
     */
    async getStatValue(statId: 'Users' | 'Revenue' | 'Orders' | 'Growth'): Promise<string> {
        const statLocators: Record<string, string> = {
            Users: DashboardLocators.statUsers,
            Revenue: DashboardLocators.statRevenue,
            Orders: DashboardLocators.statOrders,
            Growth: DashboardLocators.statGrowth,
        };
        return await this.getElementText(`${statLocators[statId]} ${DashboardLocators.statValue}`);
    }

    /**
     * Get stat label by card ID
     * @param statId - Stat card ID
     */
    async getStatLabel(statId: 'Users' | 'Revenue' | 'Orders' | 'Growth'): Promise<string> {
        const statLocators: Record<string, string> = {
            Users: DashboardLocators.statUsers,
            Revenue: DashboardLocators.statRevenue,
            Orders: DashboardLocators.statOrders,
            Growth: DashboardLocators.statGrowth,
        };
        return await this.getElementText(`${statLocators[statId]} ${DashboardLocators.statLabel}`);
    }

    /**
     * Get all stat cards data
     */
    async getAllStats(): Promise<StatCard[]> {
        const statIds = ['Users', 'Revenue', 'Orders', 'Growth'] as const;
        const stats: StatCard[] = [];

        for (const statId of statIds) {
            stats.push({
                id: statId,
                value: await this.getStatValue(statId),
                label: await this.getStatLabel(statId),
            });
        }

        return stats;
    }

    // ============ Activity Table Methods ============

    /**
     * Get activity table rows
     */
    async getActivityTableRows(): Promise<ActivityRow[]> {
        const rows = await this.page.locator(`${DashboardLocators.activityTable} tbody tr`).all();
        const activityRows: ActivityRow[] = [];

        for (const row of rows) {
            const cells = await row.locator('td').all();
            const statusBadge = await row.locator(DashboardLocators.statusBadge);
            const statusClasses = await statusBadge.getAttribute('class') || '';

            let status: 'success' | 'pending' | 'error' = 'success';
            if (statusClasses.includes('pending')) status = 'pending';
            if (statusClasses.includes('error')) status = 'error';

            activityRows.push({
                id: (await cells[0].textContent()) || '',
                activity: (await cells[1].textContent()) || '',
                user: (await cells[2].textContent()) || '',
                time: (await cells[3].textContent()) || '',
                status,
            });
        }

        return activityRows;
    }

    /**
     * Get activity table row count
     */
    async getActivityRowCount(): Promise<number> {
        return await this.page.locator(`${DashboardLocators.activityTable} tbody tr`).count();
    }

    /**
     * Check if activity table is visible
     */
    async isActivityTableVisible(): Promise<boolean> {
        return await this.isElementVisible(DashboardLocators.activityTable);
    }

    // ============ Page State Methods ============

    /**
     * Check if on dashboard page
     */
    async isOnDashboardPage(): Promise<boolean> {
        const url = this.getCurrentUrl();
        return url.includes('dashboard.html');
    }

    /**
     * Check if sidebar is visible
     */
    async isSidebarVisible(): Promise<boolean> {
        return await this.isElementVisible(DashboardLocators.sidebar);
    }

    /**
     * Check if main content is visible
     */
    async isMainContentVisible(): Promise<boolean> {
        return await this.isElementVisible(DashboardLocators.mainContent);
    }

    /**
     * Check if stats grid is visible
     */
    async isStatsGridVisible(): Promise<boolean> {
        return await this.isElementVisible(DashboardLocators.statsGrid);
    }

    /**
     * Get welcome message text
     */
    async getWelcomeMessage(): Promise<string> {
        return await this.getElementText(DashboardLocators.welcomeMessage);
    }

    /**
     * Get stats card count
     */
    async getStatsCardCount(): Promise<number> {
        return await this.page.locator(DashboardLocators.statCard).count();
    }

    // ============ Session Methods ============

    /**
     * Verify user is logged in via localStorage
     */
    async isUserLoggedIn(): Promise<boolean> {
        const isLoggedIn = await this.getLocalStorage('isLoggedIn');
        return isLoggedIn === 'true';
    }

    /**
     * Get logged in user email from localStorage
     */
    async getLoggedInUserEmail(): Promise<string | null> {
        return await this.getLocalStorage('userEmail');
    }

    /**
     * Verify logout clears session
     */
    async verifyLogoutClearsSession(): Promise<boolean> {
        const isLoggedIn = await this.getLocalStorage('isLoggedIn');
        const userEmail = await this.getLocalStorage('userEmail');
        return isLoggedIn === null && userEmail === null;
    }

    /**
     * Set up logged in session (for direct navigation testing)
     * @param email - User email
     */
    async setupLoggedInSession(email: string): Promise<void> {
        await this.setLocalStorage('isLoggedIn', 'true');
        await this.setLocalStorage('userEmail', email);
    }
}
