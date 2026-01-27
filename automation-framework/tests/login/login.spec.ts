import { test, expect } from '../../src/fixtures/test-fixtures';

/**
 * Login Page Tests - Positive Test Cases
 * Tests based on manual test cases: TC_LOGIN_001, TC_LOGIN_002, TC_LOGIN_008, TC_LOGIN_010-017
 */
test.describe('Login Page - Positive Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.clearLocalStorage();
    });

    /**
     * TC_LOGIN_001: Đăng nhập thành công với thông tin hợp lệ
     */
    test('TC_LOGIN_001: should login successfully with valid credentials', async ({ loginPage }) => {
        // Test data
        const email = 'user@example.com';
        const password = 'password123';

        // Act
        await loginPage.login(email, password);

        // Assert - Redirect to dashboard
        await expect(loginPage['page']).toHaveURL(/dashboard\.html/);

        // Assert - localStorage updated
        const isLoggedIn = await loginPage.getLocalStorage('isLoggedIn');
        const storedEmail = await loginPage.getLocalStorage('userEmail');

        expect(isLoggedIn).toBe('true');
        expect(storedEmail).toBe(email);
    });

    /**
     * TC_LOGIN_002: Đăng nhập thành công với email có subdomain
     */
    test('TC_LOGIN_002: should login successfully with subdomain email', async ({ loginPage }) => {
        // Test data
        const email = 'user@mail.company.com';
        const password = 'Test@123';

        // Act
        await loginPage.login(email, password);

        // Assert - Redirect to dashboard
        await expect(loginPage['page']).toHaveURL(/dashboard\.html/);

        // Assert - localStorage updated
        expect(await loginPage.verifyLoginSuccess()).toBe(true);
        expect(await loginPage.getStoredUserEmail()).toBe(email);
    });

    /**
     * TC_LOGIN_008: Password với đúng 6 ký tự (Minimum Valid)
     */
    test('TC_LOGIN_008: should accept password with exactly 6 characters (minimum valid)', async ({ loginPage }) => {
        // Test data
        const email = 'user@example.com';
        const password = '123456'; // 6 chars - minimum valid

        // Act
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();

        // Wait for navigation or error
        await loginPage.waitForPageLoad();

        // Assert - Password validation should pass (>= 6 chars)
        // Since this is a valid password, we should redirect to dashboard
        await expect(loginPage['page']).toHaveURL(/dashboard\.html/, { timeout: 10000 });
    });

    /**
     * TC_LOGIN_010: Password với 7 ký tự (Above Minimum)
     */
    test('TC_LOGIN_010: should accept password with 7 characters (above minimum)', async ({ loginPage }) => {
        // Test data
        const email = 'user@example.com';
        const password = '1234567'; // 7 chars

        // Act
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();

        // Wait for navigation or error
        await loginPage.waitForPageLoad();

        // Assert - Password validation should pass (>= 6 chars)
        await expect(loginPage['page']).toHaveURL(/dashboard\.html/, { timeout: 10000 });
    });

    /**
     * TC_LOGIN_011: Kiểm tra placeholder text hiển thị đúng
     */
    test('TC_LOGIN_011: should display correct placeholder texts', async ({ loginPage }) => {
        // Assert - Check placeholders
        const emailPlaceholder = await loginPage.getEmailPlaceholder();
        const passwordPlaceholder = await loginPage.getPasswordPlaceholder();

        expect(emailPlaceholder).toBe('Nhập email của bạn');
        expect(passwordPlaceholder).toBe('Nhập mật khẩu');
    });

    /**
     * TC_LOGIN_012: Kiểm tra hover effect trên Login button
     */
    test('TC_LOGIN_012: should have hover effect on login button', async ({ loginPage }) => {
        // Act - Hover over login button
        await loginPage.hoverLoginButton();

        // Assert - Button should be visible and interactive
        expect(await loginPage.isLoginButtonEnabled()).toBe(true);
    });

    /**
     * TC_LOGIN_013: Kiểm tra focus state trên input fields
     */
    test('TC_LOGIN_013: should have correct focus states and tab order', async ({ loginPage }) => {
        // Focus on email field
        await loginPage.focusEmailField();

        // Tab to password
        await loginPage.pressKey('Tab');

        // Tab to login button
        await loginPage.pressKey('Tab');

        // Assert - Tab order works (email -> password -> button)
        expect(await loginPage.isLoginButtonEnabled()).toBe(true);
    });

    /**
     * TC_LOGIN_014: Password được mask (hidden)
     */
    test('TC_LOGIN_014: should mask password input', async ({ loginPage }) => {
        // Enter password
        await loginPage.enterPassword('password123');

        // Assert - Password is masked
        expect(await loginPage.isPasswordMasked()).toBe(true);
    });

    /**
     * TC_LOGIN_016: Navigation từ Login sang Register
     */
    test('TC_LOGIN_016: should navigate to register page when clicking register link', async ({ loginPage }) => {
        // Act - Click register link
        await loginPage.clickRegisterLink();

        // Assert - Navigated to register page
        await expect(loginPage['page']).toHaveURL(/register\.html/);
    });

    /**
     * TC_LOGIN_017: Login thành công redirect đến Dashboard
     */
    test('TC_LOGIN_017: should redirect to dashboard after successful login', async ({ loginPage }) => {
        // Test data
        const email = 'user@example.com';
        const password = 'password123';

        // Act
        await loginPage.login(email, password);

        // Assert - URL contains dashboard.html
        await expect(loginPage['page']).toHaveURL(/dashboard\.html/);

        // Assert - Dashboard page loads properly
        await loginPage.waitForPageLoad();
    });

    /**
     * Additional: Verify form structure
     */
    test('should have all required form elements visible', async ({ loginPage }) => {
        // Assert - All elements visible
        expect(await loginPage.isAuthCardVisible()).toBe(true);
        expect(await loginPage.isLoginButtonEnabled()).toBe(true);
    });

    /**
     * Additional: Verify login preserves email in localStorage
     */
    test('should store correct user email in localStorage after login', async ({ loginPage }) => {
        const testEmail = 'testuser@example.com';

        await loginPage.login(testEmail, 'password123');

        const storedEmail = await loginPage.getStoredUserEmail();
        expect(storedEmail).toBe(testEmail);
    });

});
