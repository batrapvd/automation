import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RegisterLocators, PasswordRequirementIds } from '../locators/RegisterLocators';
import { RegistrationData, PasswordRequirements } from '../types';

/**
 * RegisterPage - Page Object for the Registration page
 * Handles all interactions with the registration form
 */
export class RegisterPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Get the register page URL
     */
    getPageUrl(): string {
        return `${this.baseUrl}register.html`;
    }

    /**
     * Navigate to register page
     */
    async navigate(): Promise<void> {
        await this.page.goto(this.getPageUrl());
        await this.waitForPageLoad();
    }

    /**
     * Complete registration with all fields
     * @param data - RegistrationData object
     */
    async register(data: RegistrationData): Promise<void> {
        await this.fillFullName(data.fullName);
        await this.fillUsername(data.username);
        await this.fillEmail(data.email);
        await this.fillPassword(data.password);
        await this.fillConfirmPassword(data.confirmPassword);
        await this.clickRegisterButton();
    }

    /**
     * Fill full name field
     * @param fullName - Full name to enter
     */
    async fillFullName(fullName: string): Promise<void> {
        await this.fillInput(RegisterLocators.fullnameInput, fullName);
    }

    /**
     * Fill username field
     * @param username - Username to enter
     */
    async fillUsername(username: string): Promise<void> {
        await this.fillInput(RegisterLocators.usernameInput, username);
    }

    /**
     * Fill email field
     * @param email - Email to enter
     */
    async fillEmail(email: string): Promise<void> {
        await this.fillInput(RegisterLocators.emailInput, email);
    }

    /**
     * Fill password field
     * @param password - Password to enter
     */
    async fillPassword(password: string): Promise<void> {
        await this.fillInput(RegisterLocators.passwordInput, password);
    }

    /**
     * Fill confirm password field
     * @param confirmPassword - Confirm password to enter
     */
    async fillConfirmPassword(confirmPassword: string): Promise<void> {
        await this.fillInput(RegisterLocators.confirmPasswordInput, confirmPassword);
    }

    /**
     * Click register button
     */
    async clickRegisterButton(): Promise<void> {
        await this.clickElement(RegisterLocators.registerButton);
    }

    /**
     * Click login link to navigate to login page
     */
    async clickLoginLink(): Promise<void> {
        await this.clickElement(RegisterLocators.loginLink);
        await this.waitForPageLoad();
    }

    // ============ Error State Methods ============

    /**
     * Check if full name field has error
     */
    async isFullNameInError(): Promise<boolean> {
        return await this.hasClass(RegisterLocators.fullnameGroup, RegisterLocators.errorClass);
    }

    /**
     * Check if username field has error
     */
    async isUsernameInError(): Promise<boolean> {
        return await this.hasClass(RegisterLocators.usernameGroup, RegisterLocators.errorClass);
    }

    /**
     * Check if email field has error
     */
    async isEmailInError(): Promise<boolean> {
        return await this.hasClass(RegisterLocators.emailGroup, RegisterLocators.errorClass);
    }

    /**
     * Check if password field has error
     */
    async isPasswordInError(): Promise<boolean> {
        return await this.hasClass(RegisterLocators.passwordGroup, RegisterLocators.errorClass);
    }

    /**
     * Check if confirm password field has error
     */
    async isConfirmPasswordInError(): Promise<boolean> {
        return await this.hasClass(RegisterLocators.confirmPasswordGroup, RegisterLocators.errorClass);
    }

    /**
     * Check if any field has error
     * @param fieldName - Field name to check
     */
    async isFieldInError(fieldName: 'fullname' | 'username' | 'email' | 'password' | 'confirmPassword'): Promise<boolean> {
        const groupLocators: Record<string, string> = {
            fullname: RegisterLocators.fullnameGroup,
            username: RegisterLocators.usernameGroup,
            email: RegisterLocators.emailGroup,
            password: RegisterLocators.passwordGroup,
            confirmPassword: RegisterLocators.confirmPasswordGroup,
        };
        return await this.hasClass(groupLocators[fieldName], RegisterLocators.errorClass);
    }

    // ============ Error Message Methods ============

    /**
     * Get full name error message
     */
    async getFullNameErrorMessage(): Promise<string> {
        return await this.getElementText(RegisterLocators.fullnameError);
    }

    /**
     * Get username error message
     */
    async getUsernameErrorMessage(): Promise<string> {
        return await this.getElementText(RegisterLocators.usernameError);
    }

    /**
     * Get email error message
     */
    async getEmailErrorMessage(): Promise<string> {
        return await this.getElementText(RegisterLocators.emailError);
    }

    /**
     * Get password error message
     */
    async getPasswordErrorMessage(): Promise<string> {
        return await this.getElementText(RegisterLocators.passwordError);
    }

    /**
     * Get confirm password error message
     */
    async getConfirmPasswordErrorMessage(): Promise<string> {
        return await this.getElementText(RegisterLocators.confirmPasswordError);
    }

    // ============ Password Requirements Methods ============

    /**
     * Check if specific password requirement is valid
     * @param requirement - Requirement type
     */
    async isPasswordRequirementValid(requirement: keyof typeof PasswordRequirementIds): Promise<boolean> {
        const reqId = `#${PasswordRequirementIds[requirement]}`;
        return await this.hasClass(reqId, RegisterLocators.validClass);
    }

    /**
     * Get all password requirements status
     */
    async getPasswordRequirementsStatus(): Promise<PasswordRequirements> {
        return {
            length: await this.isPasswordRequirementValid('length'),
            uppercase: await this.isPasswordRequirementValid('uppercase'),
            lowercase: await this.isPasswordRequirementValid('lowercase'),
            number: await this.isPasswordRequirementValid('number'),
            special: await this.isPasswordRequirementValid('special'),
        };
    }

    /**
     * Check if all password requirements are met
     */
    async areAllPasswordRequirementsMet(): Promise<boolean> {
        const requirements = await this.getPasswordRequirementsStatus();
        return Object.values(requirements).every(v => v === true);
    }

    /**
     * Get the icon text of a requirement (✓ or ○)
     * @param requirement - Requirement type
     */
    async getRequirementIcon(requirement: keyof typeof PasswordRequirementIds): Promise<string> {
        const reqId = `#${PasswordRequirementIds[requirement]}`;
        return await this.getElementText(`${reqId} .icon`);
    }

    // ============ Placeholder Methods ============

    /**
     * Get full name placeholder
     */
    async getFullNamePlaceholder(): Promise<string | null> {
        return await this.getPlaceholder(RegisterLocators.fullnameInput);
    }

    /**
     * Get username placeholder
     */
    async getUsernamePlaceholder(): Promise<string | null> {
        return await this.getPlaceholder(RegisterLocators.usernameInput);
    }

    /**
     * Get email placeholder
     */
    async getEmailPlaceholder(): Promise<string | null> {
        return await this.getPlaceholder(RegisterLocators.emailInput);
    }

    /**
     * Get password placeholder
     */
    async getPasswordPlaceholder(): Promise<string | null> {
        return await this.getPlaceholder(RegisterLocators.passwordInput);
    }

    /**
     * Get confirm password placeholder
     */
    async getConfirmPasswordPlaceholder(): Promise<string | null> {
        return await this.getPlaceholder(RegisterLocators.confirmPasswordInput);
    }

    // ============ Other Methods ============

    /**
     * Check if password fields are masked
     */
    async arePasswordFieldsMasked(): Promise<boolean> {
        const passwordType = await this.getAttribute(RegisterLocators.passwordInput, 'type');
        const confirmType = await this.getAttribute(RegisterLocators.confirmPasswordInput, 'type');
        return passwordType === 'password' && confirmType === 'password';
    }

    /**
     * Check if register button is enabled
     */
    async isRegisterButtonEnabled(): Promise<boolean> {
        return await this.isButtonEnabled(RegisterLocators.registerButton);
    }

    /**
     * Check if on register page
     */
    async isOnRegisterPage(): Promise<boolean> {
        const url = this.getCurrentUrl();
        return url.includes('register.html');
    }

    /**
     * Get page header title
     */
    async getHeaderTitle(): Promise<string> {
        return await this.getElementText(RegisterLocators.pageTitle);
    }

    /**
     * Clear all form fields
     */
    async clearForm(): Promise<void> {
        await this.page.locator(RegisterLocators.fullnameInput).clear();
        await this.page.locator(RegisterLocators.usernameInput).clear();
        await this.page.locator(RegisterLocators.emailInput).clear();
        await this.page.locator(RegisterLocators.passwordInput).clear();
        await this.page.locator(RegisterLocators.confirmPasswordInput).clear();
    }

    /**
     * Handle alert dialog (for success message)
     * @param accept - Whether to accept or dismiss the alert
     */
    async handleAlert(accept: boolean = true): Promise<string> {
        return new Promise((resolve) => {
            this.page.once('dialog', async dialog => {
                const message = dialog.message();
                if (accept) {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }
                resolve(message);
            });
        });
    }

    /**
     * Register and handle success alert
     * @param data - Registration data
     */
    async registerAndHandleAlert(data: RegistrationData): Promise<string> {
        const alertPromise = this.handleAlert(true);
        await this.register(data);
        return await alertPromise;
    }
}
