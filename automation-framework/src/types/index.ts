/**
 * TypeScript interfaces and types for the automation framework
 */

/**
 * User credentials for login
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * User registration data
 */
export interface RegistrationData {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

/**
 * Dashboard user info
 */
export interface UserInfo {
    email: string;
    name: string;
    avatar: string;
}

/**
 * Dashboard stat card
 */
export interface StatCard {
    id: string;
    label: string;
    value: string;
}

/**
 * Activity table row
 */
export interface ActivityRow {
    id: string;
    activity: string;
    user: string;
    time: string;
    status: 'success' | 'pending' | 'error';
}

/**
 * Password validation requirements
 */
export interface PasswordRequirements {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
}

/**
 * Form field validation result
 */
export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

/**
 * Navigation menu item
 */
export interface NavItem {
    id: string;
    label: string;
    icon: string;
    isActive: boolean;
}

/**
 * Test environment configuration
 */
export interface EnvironmentConfig {
    baseUrl: string;
    testUserEmail: string;
    testUserPassword: string;
    environment: 'sit' | 'uat' | 'prod';
}

/**
 * Page elements visibility state
 */
export interface PageState {
    isLoaded: boolean;
    hasErrors: boolean;
    errorFields: string[];
}
