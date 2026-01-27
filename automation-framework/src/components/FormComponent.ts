import { Page, Locator } from '@playwright/test';

/**
 * FormComponent - Reusable component for form interactions
 * Provides common form handling methods
 */
export class FormComponent {
    private page: Page;
    private formSelector: string;

    constructor(page: Page, formSelector: string) {
        this.page = page;
        this.formSelector = formSelector;
    }

    /**
     * Get the form locator
     */
    getForm(): Locator {
        return this.page.locator(this.formSelector);
    }

    /**
     * Fill an input field
     * @param selector - Input selector
     * @param value - Value to fill
     */
    async fillField(selector: string, value: string): Promise<void> {
        const input = this.page.locator(selector);
        await input.clear();
        await input.fill(value);
    }

    /**
     * Fill multiple fields
     * @param fields - Object with selector-value pairs
     */
    async fillFields(fields: Record<string, string>): Promise<void> {
        for (const [selector, value] of Object.entries(fields)) {
            await this.fillField(selector, value);
        }
    }

    /**
     * Submit form by clicking submit button
     * @param buttonSelector - Submit button selector
     */
    async submit(buttonSelector: string): Promise<void> {
        await this.page.locator(buttonSelector).click();
    }

    /**
     * Submit form by pressing Enter
     * @param inputSelector - Input to press Enter on
     */
    async submitWithEnter(inputSelector: string): Promise<void> {
        await this.page.locator(inputSelector).press('Enter');
    }

    /**
     * Clear all form fields
     * @param inputSelectors - Array of input selectors
     */
    async clearAll(inputSelectors: string[]): Promise<void> {
        for (const selector of inputSelectors) {
            await this.page.locator(selector).clear();
        }
    }

    /**
     * Check if field has value
     * @param selector - Input selector
     */
    async getFieldValue(selector: string): Promise<string> {
        return await this.page.locator(selector).inputValue();
    }

    /**
     * Check if field has error class
     * @param groupSelector - Form group selector
     * @param errorClass - Error class name
     */
    async hasError(groupSelector: string, errorClass: string = 'error'): Promise<boolean> {
        const classes = await this.page.locator(groupSelector).getAttribute('class');
        return classes?.includes(errorClass) || false;
    }

    /**
     * Get error message text
     * @param errorSelector - Error message selector
     */
    async getErrorMessage(errorSelector: string): Promise<string> {
        return (await this.page.locator(errorSelector).textContent()) || '';
    }

    /**
     * Check if form is valid (no error classes)
     * @param groupSelectors - Array of form group selectors
     * @param errorClass - Error class name
     */
    async isFormValid(groupSelectors: string[], errorClass: string = 'error'): Promise<boolean> {
        for (const selector of groupSelectors) {
            if (await this.hasError(selector, errorClass)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Focus on a field
     * @param selector - Input selector
     */
    async focusField(selector: string): Promise<void> {
        await this.page.locator(selector).focus();
    }

    /**
     * Tab to next field
     */
    async tabToNext(): Promise<void> {
        await this.page.keyboard.press('Tab');
    }

    /**
     * Get placeholder text
     * @param selector - Input selector
     */
    async getPlaceholder(selector: string): Promise<string | null> {
        return await this.page.locator(selector).getAttribute('placeholder');
    }

    /**
     * Check if field is required
     * @param selector - Input selector
     */
    async isRequired(selector: string): Promise<boolean> {
        const required = await this.page.locator(selector).getAttribute('required');
        return required !== null;
    }

    /**
     * Get input type
     * @param selector - Input selector
     */
    async getInputType(selector: string): Promise<string | null> {
        return await this.page.locator(selector).getAttribute('type');
    }
}
