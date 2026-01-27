import { Page } from '@playwright/test';

/**
 * NavigationComponent - Reusable component for navigation interactions
 * Used across pages that have navigation elements
 */
export class NavigationComponent {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Click a navigation link by text
     * @param text - Link text
     */
    async clickLinkByText(text: string): Promise<void> {
        await this.page.getByRole('link', { name: text }).click();
    }

    /**
     * Click a navigation link by href
     * @param href - Link href attribute
     */
    async clickLinkByHref(href: string): Promise<void> {
        await this.page.locator(`a[href="${href}"]`).click();
    }

    /**
     * Check if link exists
     * @param text - Link text
     */
    async linkExists(text: string): Promise<boolean> {
        const count = await this.page.getByRole('link', { name: text }).count();
        return count > 0;
    }

    /**
     * Get all navigation links
     */
    async getAllLinks(): Promise<string[]> {
        const links = await this.page.locator('a').all();
        const hrefs: string[] = [];

        for (const link of links) {
            const href = await link.getAttribute('href');
            if (href) {
                hrefs.push(href);
            }
        }

        return hrefs;
    }

    /**
     * Check if current page matches URL
     * @param urlPart - Part of URL to check
     */
    isOnPage(urlPart: string): boolean {
        return this.page.url().includes(urlPart);
    }

    /**
     * Navigate back
     */
    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    /**
     * Navigate forward
     */
    async goForward(): Promise<void> {
        await this.page.goForward();
    }

    /**
     * Reload current page
     */
    async reload(): Promise<void> {
        await this.page.reload();
    }
}
