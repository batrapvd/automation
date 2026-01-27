/**
 * Dashboard Page Locators
 * Centralized selectors for the dashboard page elements
 */
export const DashboardLocators = {
    // Container
    dashboardContainer: '.dashboard-container',

    // Sidebar
    sidebar: '.sidebar',
    sidebarHeader: '.sidebar-header',
    sidebarFooter: '.sidebar-footer',
    logo: '.logo',

    // Navigation
    navMenu: '.nav-menu',
    navItem: '.nav-item',
    navLink: '.nav-link',
    navLinkActive: '.nav-link.active',
    navDashboard: '#navDashboard',
    navAnalytics: '#navAnalytics',
    navProjects: '#navProjects',
    navSettings: '#navSettings',

    // Logout
    logoutButton: '#logoutBtn',

    // Main content
    mainContent: '.main-content',
    header: '.header',

    // User info
    userInfo: '.user-info',
    userDetails: '.user-details',
    userName: '#userName',
    userEmail: '#userEmail',
    userAvatar: '#userAvatar',

    // Stats grid
    statsGrid: '.stats-grid',
    statCard: '.stat-card',
    statUsers: '#statUsers',
    statRevenue: '#statRevenue',
    statOrders: '#statOrders',
    statGrowth: '#statGrowth',
    statValue: '.value',
    statLabel: '.label',

    // Activity table
    contentCard: '.content-card',
    activityTable: '#activityTable',
    tableHeader: 'thead',
    tableBody: 'tbody',
    tableRow: 'tr',
    tableCell: 'td',
    statusBadge: '.status-badge',
    statusSuccess: '.status-badge.success',
    statusPending: '.status-badge.pending',
    statusError: '.status-badge.error',

    // Page elements
    pageTitle: 'h1',
    welcomeMessage: 'header h1',
} as const;

/**
 * Type for DashboardLocators keys
 */
export type DashboardLocatorKey = keyof typeof DashboardLocators;

/**
 * Navigation item names
 */
export const NavItemNames = {
    dashboard: 'Tổng quan',
    analytics: 'Phân tích',
    projects: 'Dự án',
    settings: 'Cài đặt',
} as const;
