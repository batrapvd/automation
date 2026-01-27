import { test, expect } from '../../src/fixtures/test-fixtures';
import { RegistrationData } from '../../src/types';

/**
 * Register Page Tests - Positive Test Cases
 * Tests based on manual test cases: TC_REG_001, TC_REG_002, TC_REG_013, TC_REG_015, TC_REG_017, TC_REG_019, TC_REG_023, TC_REG_025, TC_REG_026
 */
test.describe('Register Page - Positive Tests', () => {

    test.beforeEach(async ({ registerPage }) => {
        await registerPage.navigate();
    });

    /**
     * TC_REG_001: Đăng ký thành công với tất cả thông tin hợp lệ
     */
    test('TC_REG_001: should register successfully with all valid information', async ({ registerPage }) => {
        // Test data
        const registrationData: RegistrationData = {
            fullName: 'Nguyen Van A',
            username: 'testuser1234',
            email: 'test@example.com',
            password: 'Test@123456',
            confirmPassword: 'Test@123456',
        };

        // Set up dialog handler before registration
        registerPage['page'].once('dialog', async dialog => {
            expect(dialog.message()).toContain('Đăng ký thành công');
            await dialog.accept();
        });

        // Act
        await registerPage.register(registrationData);

        // Assert - Password requirements all met before submission
        // (checked during filling)
    });

    /**
     * TC_REG_002: Đăng ký thành công với password phức tạp
     */
    test('TC_REG_002: should register successfully with complex password', async ({ registerPage }) => {
        // Test data with complex password
        const registrationData: RegistrationData = {
            fullName: 'Tran Thi B',
            username: 'newuser12345',
            email: 'newuser@test.com',
            password: 'Abc@1234!',
            confirmPassword: 'Abc@1234!',
        };

        // Handle success alert
        registerPage['page'].once('dialog', async dialog => {
            expect(dialog.message()).toContain('Đăng ký thành công');
            await dialog.accept();
        });

        // Act - Fill password and check requirements
        await registerPage.fillPassword(registrationData.password);

        // Assert - All password requirements met
        expect(await registerPage.areAllPasswordRequirementsMet()).toBe(true);

        // Complete registration
        await registerPage.fillFullName(registrationData.fullName);
        await registerPage.fillUsername(registrationData.username);
        await registerPage.fillEmail(registrationData.email);
        await registerPage.fillConfirmPassword(registrationData.confirmPassword);
        await registerPage.clickRegisterButton();
    });

    /**
     * TC_REG_013: Username với đúng 10 ký tự (Minimum Valid)
     */
    test('TC_REG_013: should accept username with exactly 10 characters (minimum valid)', async ({ registerPage }) => {
        // Test data
        const registrationData: RegistrationData = {
            fullName: 'Test User',
            username: 'abcdefghij', // 10 chars
            email: 'test@example.com',
            password: 'Test@123456',
            confirmPassword: 'Test@123456',
        };

        // Handle success alert
        registerPage['page'].once('dialog', async dialog => {
            await dialog.accept();
        });

        // Act
        await registerPage.register(registrationData);

        // Assert - No username error
        expect(await registerPage.isUsernameInError()).toBe(false);
    });

    /**
     * TC_REG_015: Username với đúng 15 ký tự (Maximum Valid)
     */
    test('TC_REG_015: should accept username with exactly 15 characters (maximum valid)', async ({ registerPage }) => {
        // Test data
        const registrationData: RegistrationData = {
            fullName: 'Test User',
            username: 'abcdefghijklmno', // 15 chars
            email: 'test@example.com',
            password: 'Test@123456',
            confirmPassword: 'Test@123456',
        };

        // Handle success alert
        registerPage['page'].once('dialog', async dialog => {
            await dialog.accept();
        });

        // Act
        await registerPage.register(registrationData);

        // Assert - No username error
        expect(await registerPage.isUsernameInError()).toBe(false);
    });

    /**
     * TC_REG_017: Password với đúng 8 ký tự (Minimum Valid)
     */
    test('TC_REG_017: should accept password with exactly 8 characters (minimum valid)', async ({ registerPage }) => {
        // Test data - 8 char password with all requirements
        const password = 'Test@12A'; // 8 chars with uppercase, lowercase, number, special

        // Act - Fill password
        await registerPage.fillPassword(password);

        // Assert - Length requirement met
        expect(await registerPage.isPasswordRequirementValid('length')).toBe(true);
        expect(await registerPage.areAllPasswordRequirementsMet()).toBe(true);
    });

    /**
     * TC_REG_019: Kiểm tra Password Requirements hiển thị real-time
     */
    test('TC_REG_019: should update password requirements in real-time', async ({ registerPage }) => {
        // Step 1: Enter lowercase only
        await registerPage.fillPassword('a');
        expect(await registerPage.isPasswordRequirementValid('lowercase')).toBe(true);
        expect(await registerPage.isPasswordRequirementValid('uppercase')).toBe(false);

        // Step 2: Add uppercase
        await registerPage.fillPassword('aA');
        expect(await registerPage.isPasswordRequirementValid('uppercase')).toBe(true);

        // Step 3: Add number
        await registerPage.fillPassword('aA1');
        expect(await registerPage.isPasswordRequirementValid('number')).toBe(true);

        // Step 4: Add special
        await registerPage.fillPassword('aA1@');
        expect(await registerPage.isPasswordRequirementValid('special')).toBe(true);

        // Step 5: Complete to 8 chars
        await registerPage.fillPassword('aA1@bcde');
        expect(await registerPage.isPasswordRequirementValid('length')).toBe(true);
        expect(await registerPage.areAllPasswordRequirementsMet()).toBe(true);
    });

    /**
     * TC_REG_023: Password được mask (hidden)
     */
    test('TC_REG_023: should mask password and confirm password fields', async ({ registerPage }) => {
        // Act - Enter passwords
        await registerPage.fillPassword('Test@123');
        await registerPage.fillConfirmPassword('Test@123');

        // Assert - Both fields are masked
        expect(await registerPage.arePasswordFieldsMasked()).toBe(true);
    });

    /**
     * TC_REG_025: Navigation từ Register sang Login
     */
    test('TC_REG_025: should navigate to login page when clicking login link', async ({ registerPage }) => {
        // Act - Click login link
        await registerPage.clickLoginLink();

        // Assert - Navigated to login page
        await expect(registerPage['page']).toHaveURL(/login\.html/);
    });

    /**
     * TC_REG_026: Đăng ký thành công redirect về Login
     */
    test('TC_REG_026: should redirect to login page after successful registration', async ({ registerPage }) => {
        // Test data
        const registrationData: RegistrationData = {
            fullName: 'Nguyen Van Test',
            username: 'testuser12345',
            email: 'test@example.com',
            password: 'Test@123456',
            confirmPassword: 'Test@123456',
        };

        // Handle success alert
        registerPage['page'].once('dialog', async dialog => {
            expect(dialog.message()).toContain('Đăng ký thành công');
            await dialog.accept();
        });

        // Act
        await registerPage.register(registrationData);

        // Assert - Redirected to login page
        await expect(registerPage['page']).toHaveURL(/login\.html/);
    });

    /**
     * Additional: Verify all form elements are visible
     */
    test('should display all form elements correctly', async ({ registerPage }) => {
        // Assert - All placeholders correct
        expect(await registerPage.getFullNamePlaceholder()).toBe('Nhập họ và tên');
        expect(await registerPage.getUsernamePlaceholder()).toBe('Nhập username (10-15 ký tự)');
        expect(await registerPage.getEmailPlaceholder()).toBe('Nhập email (vd: user@domain.com)');
        expect(await registerPage.getPasswordPlaceholder()).toBe('Tạo mật khẩu phức tạp');
        expect(await registerPage.getConfirmPasswordPlaceholder()).toBe('Nhập lại mật khẩu');
    });

    /**
     * Additional: Verify register button is enabled
     */
    test('should have register button enabled', async ({ registerPage }) => {
        expect(await registerPage.isRegisterButtonEnabled()).toBe(true);
    });

    /**
     * Additional: Verify page header
     */
    test('should display correct page header', async ({ registerPage }) => {
        const header = await registerPage.getHeaderTitle();
        expect(header).toContain('Tạo tài khoản mới');
    });

});
