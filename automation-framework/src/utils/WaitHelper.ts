import { Page, Locator } from '@playwright/test';

/**
 * WaitHelper - Utility for custom wait conditions
 * Provides additional wait methods beyond Playwright's built-in waits
 */
export class WaitHelper {
    private page: Page;
    private defaultTimeout: number;

    constructor(page: Page, defaultTimeout: number = 10000) {
        this.page = page;
        this.defaultTimeout = defaultTimeout;
    }

    /**
     * Wait for element to be visible
     * @param selector - CSS selector
     * @param timeout - Optional timeout
     */
    async waitForVisible(selector: string, timeout?: number): Promise<Locator> {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'visible', timeout: timeout || this.defaultTimeout });
        return locator;
    }

    /**
     * Wait for element to be hidden
     * @param selector - CSS selector
     * @param timeout - Optional timeout
     */
    async waitForHidden(selector: string, timeout?: number): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'hidden', timeout: timeout || this.defaultTimeout });
    }

    /**
     * Wait for element to be attached to DOM
     * @param selector - CSS selector
     * @param timeout - Optional timeout
     */
    async waitForAttached(selector: string, timeout?: number): Promise<Locator> {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'attached', timeout: timeout || this.defaultTimeout });
        return locator;
    }

    /**
     * Wait for element to be detached from DOM
     * @param selector - CSS selector
     * @param timeout - Optional timeout
     */
    async waitForDetached(selector: string, timeout?: number): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'detached', timeout: timeout || this.defaultTimeout });
    }

    /**
     * Wait for network to be idle
     * @param timeout - Optional timeout
     */
    async waitForNetworkIdle(timeout?: number): Promise<void> {
        await this.page.waitForLoadState('networkidle', { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Wait for DOM content to be loaded
     * @param timeout - Optional timeout
     */
    async waitForDomContentLoaded(timeout?: number): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded', { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Wait for page to be fully loaded
     * @param timeout - Optional timeout
     */
    async waitForPageLoad(timeout?: number): Promise<void> {
        await this.page.waitForLoadState('load', { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Wait for URL to contain specific string
     * @param urlPart - Part of URL to wait for
     * @param timeout - Optional timeout
     */
    async waitForUrlContains(urlPart: string, timeout?: number): Promise<void> {
        await this.page.waitForURL(`**/*${urlPart}*`, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Wait for URL to match exactly
     * @param url - Exact URL to wait for
     * @param timeout - Optional timeout
     */
    async waitForUrl(url: string, timeout?: number): Promise<void> {
        await this.page.waitForURL(url, { timeout: timeout || this.defaultTimeout });
    }

    /**
     * Wait for element to have specific text
     * @param selector - CSS selector
     * @param text - Text to wait for
     * @param timeout - Optional timeout
     */
    async waitForText(selector: string, text: string, timeout?: number): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.filter({ hasText: text }).waitFor({
            state: 'visible',
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Wait for element to have specific class
     * @param selector - CSS selector
     * @param className - Class name to wait for
     * @param timeout - Optional timeout
     */
    async waitForClass(selector: string, className: string, timeout?: number): Promise<void> {
        const deadline = Date.now() + (timeout || this.defaultTimeout);

        while (Date.now() < deadline) {
            const classes = await this.page.locator(selector).getAttribute('class');
            if (classes?.includes(className)) {
                return;
            }
            await this.page.waitForTimeout(100);
        }

        throw new Error(`Element ${selector} did not get class ${className} within timeout`);
    }

    /**
     * Wait for element to lose specific class
     * @param selector - CSS selector
     * @param className - Class name to wait for removal
     * @param timeout - Optional timeout
     */
    async waitForClassRemoval(selector: string, className: string, timeout?: number): Promise<void> {
        const deadline = Date.now() + (timeout || this.defaultTimeout);

        while (Date.now() < deadline) {
            const classes = await this.page.locator(selector).getAttribute('class');
            if (!classes?.includes(className)) {
                return;
            }
            await this.page.waitForTimeout(100);
        }

        throw new Error(`Element ${selector} still has class ${className} after timeout`);
    }

    /**
     * Wait for element count
     * @param selector - CSS selector
     * @param count - Expected count
     * @param timeout - Optional timeout
     */
    async waitForCount(selector: string, count: number, timeout?: number): Promise<void> {
        const deadline = Date.now() + (timeout || this.defaultTimeout);

        while (Date.now() < deadline) {
            const currentCount = await this.page.locator(selector).count();
            if (currentCount === count) {
                return;
            }
            await this.page.waitForTimeout(100);
        }

        throw new Error(`Element ${selector} count did not reach ${count} within timeout`);
    }

    /**
     * Wait for custom condition
     * @param condition - Async function that returns boolean
     * @param timeout - Optional timeout
     * @param interval - Polling interval
     */
    async waitForCondition(
        condition: () => Promise<boolean>,
        timeout?: number,
        interval: number = 100
    ): Promise<void> {
        const deadline = Date.now() + (timeout || this.defaultTimeout);

        while (Date.now() < deadline) {
            if (await condition()) {
                return;
            }
            await this.page.waitForTimeout(interval);
        }

        throw new Error('Custom condition was not met within timeout');
    }

    /**
     * Wait for localStorage value
     * @param key - localStorage key
     * @param expectedValue - Expected value
     * @param timeout - Optional timeout
     */
    async waitForLocalStorageValue(key: string, expectedValue: string, timeout?: number): Promise<void> {
        await this.waitForCondition(async () => {
            const value = await this.page.evaluate((k) => localStorage.getItem(k), key);
            return value === expectedValue;
        }, timeout);
    }

    /**
     * Simple delay
     * @param ms - Milliseconds to wait
     */
    async delay(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
