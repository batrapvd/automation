/**
 * Login Page Locators
 * Centralized selectors for the login page elements
 */
export const LoginLocators = {
    // Form
    loginForm: '#loginForm',

    // Input fields
    emailInput: '#email',
    passwordInput: '#password',

    // Buttons
    loginButton: '#loginBtn',

    // Form groups (for error state checking)
    emailGroup: '#emailGroup',
    passwordGroup: '#passwordGroup',

    // Error messages
    emailError: '#emailError',
    passwordError: '#passwordError',

    // Navigation links
    registerLink: 'a[href="register.html"]',

    // CSS classes
    errorClass: 'error',

    // Page elements
    pageTitle: 'h1',
    logo: '.logo',
    authCard: '.auth-card',
    authFooter: '.auth-footer',
} as const;

/**
 * Type for LoginLocators keys
 */
export type LoginLocatorKey = keyof typeof LoginLocators;
