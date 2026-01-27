import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginLocators } from '../locators/LoginLocators';
import { LoginCredentials } from '../types';

/**
 * LoginPage - Page Object for the Login page
 * Handles all interactions with the login form
 */
export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Get the login page URL
     */
    getPageUrl(): string {
        return `${this.baseUrl}login.html`;
    }

    /**
     * Navigate to login page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.getPageUrl());
        await this.waitForPageLoad();
    }

    /**
     * Perform login with email and password
     * @param email - User email
     * @param password - User password
     */
    async login(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Login using credentials object
     * @param credentials - LoginCredentials object
     */
    async loginWithCredentials(credentials: LoginCredentials): Promise<void> {
        await this.login(credentials.email, credentials.password);
    }

    /**
     * Enter email
     * @param email - Email to enter
     */
    async enterEmail(email: string): Promise<void> {
        await this.fillInput(LoginLocators.emailInput, email);
    }

    /**
     * Enter password
     * @param password - Password to enter
     */
    async enterPassword(password: string): Promise<void> {
        await this.fillInput(LoginLocators.passwordInput, password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton(): Promise<void> {
        await this.clickElement(LoginLocators.loginButton);
    }

    /**
     * Get email error message text
     */
    async getEmailErrorMessage(): Promise<string> {
        return await this.getElementText(LoginLocators.emailError);
    }

    /**
     * Get password error message text
     */
    async getPasswordErrorMessage(): Promise<string> {
        return await this.getElementText(LoginLocators.passwordError);
    }

    /**
     * Check if email field has error state
     */
    async isEmailFieldInError(): Promise<boolean> {
        return await this.hasClass(LoginLocators.emailGroup, LoginLocators.errorClass);
    }

    /**
     * Check if password field has error state
     */
    async isPasswordFieldInError(): Promise<boolean> {
        return await this.hasClass(LoginLocators.passwordGroup, LoginLocators.errorClass);
    }

    /**
     * Check if login button is enabled
     */
    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.isButtonEnabled(LoginLocators.loginButton);
    }

    /**
     * Click register link to navigate to registration page
     */
    async clickRegisterLink(): Promise<void> {
        await this.clickElement(LoginLocators.registerLink);
        await this.waitForPageLoad();
    }

    /**
     * Get email placeholder text
     */
    async getEmailPlaceholder(): Promise<string | null> {
        return await this.getPlaceholder(LoginLocators.emailInput);
    }

    /**
     * Get password placeholder text
     */
    async getPasswordPlaceholder(): Promise<string | null> {
        return await this.getPlaceholder(LoginLocators.passwordInput);
    }

    /**
     * Get current email value
     */
    async getEmailValue(): Promise<string> {
        return await this.getInputValue(LoginLocators.emailInput);
    }

    /**
     * Get current password value
     */
    async getPasswordValue(): Promise<string> {
        return await this.getInputValue(LoginLocators.passwordInput);
    }

    /**
     * Check if password field is of type password (masked)
     */
    async isPasswordMasked(): Promise<boolean> {
        const inputType = await this.getAttribute(LoginLocators.passwordInput, 'type');
        return inputType === 'password';
    }

    /**
     * Clear all form fields
     */
    async clearForm(): Promise<void> {
        await this.page.locator(LoginLocators.emailInput).clear();
        await this.page.locator(LoginLocators.passwordInput).clear();
    }

    /**
     * Focus on email field
     */
    async focusEmailField(): Promise<void> {
        await this.focusElement(LoginLocators.emailInput);
    }

    /**
     * Focus on password field
     */
    async focusPasswordField(): Promise<void> {
        await this.focusElement(LoginLocators.passwordInput);
    }

    /**
     * Check if on login page
     */
    async isOnLoginPage(): Promise<boolean> {
        const url = this.getCurrentUrl();
        return url.includes('login.html');
    }

    /**
     * Get page header title
     */
    async getHeaderTitle(): Promise<string> {
        return await this.getElementText(LoginLocators.pageTitle);
    }

    /**
     * Hover over login button
     */
    async hoverLoginButton(): Promise<void> {
        await this.hoverElement(LoginLocators.loginButton);
    }

    /**
     * Submit form by pressing Enter key on password field
     */
    async submitFormWithEnter(): Promise<void> {
        await this.focusPasswordField();
        await this.pressKey('Enter');
    }

    /**
     * Check if auth card is visible
     */
    async isAuthCardVisible(): Promise<boolean> {
        return await this.isElementVisible(LoginLocators.authCard);
    }

    /**
     * Verify successful login by checking localStorage
     */
    async verifyLoginSuccess(): Promise<boolean> {
        const isLoggedIn = await this.getLocalStorage('isLoggedIn');
        return isLoggedIn === 'true';
    }

    /**
     * Get stored user email from localStorage
     */
    async getStoredUserEmail(): Promise<string | null> {
        return await this.getLocalStorage('userEmail');
    }
}
