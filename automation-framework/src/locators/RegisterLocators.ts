/**
 * Register Page Locators
 * Centralized selectors for the registration page elements
 */
export const RegisterLocators = {
    // Form
    registerForm: '#registerForm',

    // Input fields
    fullnameInput: '#fullname',
    usernameInput: '#username',
    emailInput: '#email',
    passwordInput: '#password',
    confirmPasswordInput: '#confirmPassword',

    // Buttons
    registerButton: '#registerBtn',

    // Form groups (for error state checking)
    fullnameGroup: '#fullnameGroup',
    usernameGroup: '#usernameGroup',
    emailGroup: '#emailGroup',
    passwordGroup: '#passwordGroup',
    confirmPasswordGroup: '#confirmPasswordGroup',

    // Error messages
    fullnameError: '#fullnameError',
    usernameError: '#usernameError',
    emailError: '#emailError',
    passwordError: '#passwordError',
    confirmPasswordError: '#confirmPasswordError',

    // Password requirements
    passwordRequirements: '.password-requirements',
    reqLength: '#reqLength',
    reqUppercase: '#reqUppercase',
    reqLowercase: '#reqLowercase',
    reqNumber: '#reqNumber',
    reqSpecial: '#reqSpecial',

    // Navigation links
    loginLink: 'a[href="login.html"]',

    // CSS classes
    errorClass: 'error',
    validClass: 'valid',

    // Page elements
    pageTitle: 'h1',
    logo: '.logo',
    authCard: '.auth-card',
    authFooter: '.auth-footer',
} as const;

/**
 * Type for RegisterLocators keys
 */
export type RegisterLocatorKey = keyof typeof RegisterLocators;

/**
 * Password requirement IDs
 */
export const PasswordRequirementIds = {
    length: 'reqLength',
    uppercase: 'reqUppercase',
    lowercase: 'reqLowercase',
    number: 'reqNumber',
    special: 'reqSpecial',
} as const;
