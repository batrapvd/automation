import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage - Abstract base class for all Page Objects
 * Provides common functionality shared across all pages
 */
export abstract class BasePage {
    protected page: Page;
    protected baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'file:///Users/kieutb/Documents/automation/';
    }

    /**
     * Navigate to the page - must be implemented by each page
     */
    abstract navigate(): Promise<void>;

    /**
     * Get the page URL
     */
    abstract getPageUrl(): string;

    /**
     * Wait for page to fully load
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Wait for network to be idle
     */
    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Take a screenshot
     * @param name - Screenshot name (without extension)
     */
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `reports/screenshots/${name}.png`,
            fullPage: true
        });
    }

    /**
     * Wait for an element to be visible
     * @param selector - CSS selector
     * @param timeout - Optional timeout in milliseconds
     */
    async waitForElementVisible(selector: string, timeout?: number): Promise<Locator> {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'visible', timeout: timeout || 5000 });
        return locator;
    }

    /**
     * Wait for an element to be hidden
     * @param selector - CSS selector
     * @param timeout - Optional timeout in milliseconds
     */
    async waitForElementHidden(selector: string, timeout?: number): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'hidden', timeout: timeout || 5000 });
    }

    /**
     * Check if element exists on page
     * @param selector - CSS selector
     */
    async isElementPresent(selector: string): Promise<boolean> {
        const count = await this.page.locator(selector).count();
        return count > 0;
    }

    /**
     * Check if element is visible
     * @param selector - CSS selector
     */
    async isElementVisible(selector: string): Promise<boolean> {
        const locator = this.page.locator(selector);
        return await locator.isVisible();
    }

    /**
     * Get element text
     * @param selector - CSS selector
     */
    async getElementText(selector: string): Promise<string> {
        const locator = this.page.locator(selector);
        return (await locator.textContent()) || '';
    }

    /**
     * Get input value
     * @param selector - CSS selector
     */
    async getInputValue(selector: string): Promise<string> {
        const locator = this.page.locator(selector);
        return await locator.inputValue();
    }

    /**
     * Check if element has a specific CSS class
     * @param selector - CSS selector
     * @param className - Class name to check
     */
    async hasClass(selector: string, className: string): Promise<boolean> {
        const locator = this.page.locator(selector);
        const classes = await locator.getAttribute('class');
        return classes?.includes(className) || false;
    }

    /**
     * Get element attribute
     * @param selector - CSS selector
     * @param attribute - Attribute name
     */
    async getAttribute(selector: string, attribute: string): Promise<string | null> {
        const locator = this.page.locator(selector);
        return await locator.getAttribute(attribute);
    }

    /**
     * Fill input field
     * @param selector - CSS selector
     * @param value - Value to fill
     */
    async fillInput(selector: string, value: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.clear();
        await locator.fill(value);
    }

    /**
     * Click element
     * @param selector - CSS selector
     */
    async clickElement(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.click();
    }

    /**
     * Set value in localStorage
     * @param key - Storage key
     * @param value - Value to store
     */
    async setLocalStorage(key: string, value: string): Promise<void> {
        await this.page.evaluate(([k, v]) => {
            localStorage.setItem(k, v);
        }, [key, value]);
    }

    /**
     * Get value from localStorage
     * @param key - Storage key
     */
    async getLocalStorage(key: string): Promise<string | null> {
        return await this.page.evaluate((k) => {
            return localStorage.getItem(k);
        }, key);
    }

    /**
     * Clear localStorage
     */
    async clearLocalStorage(): Promise<void> {
        await this.page.evaluate(() => {
            localStorage.clear();
        });
    }

    /**
     * Remove specific item from localStorage
     * @param key - Storage key
     */
    async removeLocalStorageItem(key: string): Promise<void> {
        await this.page.evaluate((k) => {
            localStorage.removeItem(k);
        }, key);
    }

    /**
     * Wait for URL to contain specific string
     * @param urlPart - Part of URL to wait for
     * @param timeout - Optional timeout
     */
    async waitForUrlContains(urlPart: string, timeout?: number): Promise<void> {
        await this.page.waitForURL(`**/*${urlPart}*`, { timeout: timeout || 10000 });
    }

    /**
     * Reload the page
     */
    async reload(): Promise<void> {
        await this.page.reload();
        await this.waitForPageLoad();
    }

    /**
     * Go back in browser history
     */
    async goBack(): Promise<void> {
        await this.page.goBack();
        await this.waitForPageLoad();
    }

    /**
     * Press keyboard key
     * @param key - Key to press (e.g., 'Enter', 'Tab')
     */
    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    /**
     * Focus on element
     * @param selector - CSS selector
     */
    async focusElement(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.focus();
    }

    /**
     * Hover over element
     * @param selector - CSS selector
     */
    async hoverElement(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.hover();
    }

    /**
     * Get placeholder text of input
     * @param selector - CSS selector
     */
    async getPlaceholder(selector: string): Promise<string | null> {
        return await this.getAttribute(selector, 'placeholder');
    }

    /**
     * Check if button is enabled
     * @param selector - CSS selector
     */
    async isButtonEnabled(selector: string): Promise<boolean> {
        const locator = this.page.locator(selector);
        return await locator.isEnabled();
    }
}
