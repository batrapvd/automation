import { Page, expect } from '@playwright/test';

/**
 * AssertionHelper - Utility for common assertions
 * Provides reusable assertion patterns for tests
 */
export class AssertionHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Assert element is visible
     * @param selector - CSS selector
     */
    async assertVisible(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    /**
     * Assert element is hidden
     * @param selector - CSS selector
     */
    async assertHidden(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeHidden();
    }

    /**
     * Assert element contains text
     * @param selector - CSS selector
     * @param text - Expected text
     */
    async assertContainsText(selector: string, text: string): Promise<void> {
        await expect(this.page.locator(selector)).toContainText(text);
    }

    /**
     * Assert element has exact text
     * @param selector - CSS selector
     * @param text - Expected exact text
     */
    async assertHasText(selector: string, text: string): Promise<void> {
        await expect(this.page.locator(selector)).toHaveText(text);
    }

    /**
     * Assert element has CSS class
     * @param selector - CSS selector
     * @param className - Expected class name
     */
    async assertHasClass(selector: string, className: string): Promise<void> {
        await expect(this.page.locator(selector)).toHaveClass(new RegExp(className));
    }

    /**
     * Assert element does not have CSS class
     * @param selector - CSS selector
     * @param className - Class name that should not be present
     */
    async assertNotHasClass(selector: string, className: string): Promise<void> {
        const classes = await this.page.locator(selector).getAttribute('class');
        expect(classes).not.toContain(className);
    }

    /**
     * Assert element has attribute
     * @param selector - CSS selector
     * @param attribute - Attribute name
     * @param value - Expected attribute value
     */
    async assertHasAttribute(selector: string, attribute: string, value: string): Promise<void> {
        await expect(this.page.locator(selector)).toHaveAttribute(attribute, value);
    }

    /**
     * Assert input has value
     * @param selector - CSS selector
     * @param value - Expected input value
     */
    async assertInputValue(selector: string, value: string): Promise<void> {
        await expect(this.page.locator(selector)).toHaveValue(value);
    }

    /**
     * Assert input is empty
     * @param selector - CSS selector
     */
    async assertInputEmpty(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toHaveValue('');
    }

    /**
     * Assert button is enabled
     * @param selector - CSS selector
     */
    async assertEnabled(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeEnabled();
    }

    /**
     * Assert button is disabled
     * @param selector - CSS selector
     */
    async assertDisabled(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeDisabled();
    }

    /**
     * Assert URL contains string
     * @param urlPart - Part of URL to check
     */
    async assertUrlContains(urlPart: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(urlPart));
    }

    /**
     * Assert exact URL
     * @param url - Expected URL
     */
    async assertUrl(url: string): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }

    /**
     * Assert page title
     * @param title - Expected title
     */
    async assertTitle(title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    /**
     * Assert page title contains
     * @param titlePart - Part of title to check
     */
    async assertTitleContains(titlePart: string): Promise<void> {
        await expect(this.page).toHaveTitle(new RegExp(titlePart));
    }

    /**
     * Assert element count
     * @param selector - CSS selector
     * @param count - Expected count
     */
    async assertCount(selector: string, count: number): Promise<void> {
        await expect(this.page.locator(selector)).toHaveCount(count);
    }

    /**
     * Assert localStorage contains key with value
     * @param key - localStorage key
     * @param value - Expected value
     */
    async assertLocalStorage(key: string, value: string): Promise<void> {
        const storedValue = await this.page.evaluate((k) => localStorage.getItem(k), key);
        expect(storedValue).toBe(value);
    }

    /**
     * Assert localStorage key does not exist
     * @param key - localStorage key
     */
    async assertLocalStorageEmpty(key: string): Promise<void> {
        const storedValue = await this.page.evaluate((k) => localStorage.getItem(k), key);
        expect(storedValue).toBeNull();
    }

    /**
     * Assert element has focus
     * @param selector - CSS selector
     */
    async assertFocused(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeFocused();
    }

    /**
     * Assert element is checked (checkbox/radio)
     * @param selector - CSS selector
     */
    async assertChecked(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeChecked();
    }

    /**
     * Assert element is not checked
     * @param selector - CSS selector
     */
    async assertNotChecked(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).not.toBeChecked();
    }

    /**
     * Assert element has placeholder
     * @param selector - CSS selector
     * @param placeholder - Expected placeholder text
     */
    async assertPlaceholder(selector: string, placeholder: string): Promise<void> {
        await expect(this.page.locator(selector)).toHaveAttribute('placeholder', placeholder);
    }

    /**
     * Assert element CSS property
     * @param selector - CSS selector
     * @param property - CSS property name
     * @param value - Expected CSS value
     */
    async assertCssProperty(selector: string, property: string, value: string): Promise<void> {
        const element = this.page.locator(selector);
        const cssValue = await element.evaluate((el, prop) => {
            return window.getComputedStyle(el).getPropertyValue(prop);
        }, property);
        expect(cssValue).toBe(value);
    }

    /**
     * Assert no console errors during test
     */
    async assertNoConsoleErrors(): Promise<void> {
        const errors: string[] = [];
        this.page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Wait a bit to collect any errors
        await this.page.waitForTimeout(500);
        expect(errors).toHaveLength(0);
    }
}
