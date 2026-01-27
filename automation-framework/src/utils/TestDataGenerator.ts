import { RegistrationData, LoginCredentials } from '../types';

/**
 * TestDataGenerator - Utility for generating test data
 * Provides methods for creating valid and invalid test inputs
 */
export class TestDataGenerator {
    /**
     * Generate a random string of specified length
     * @param length - Length of the string
     * @param charset - Character set to use
     */
    static randomString(length: number, charset: string = 'abcdefghijklmnopqrstuvwxyz'): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    }

    /**
     * Generate a random number
     * @param min - Minimum value
     * @param max - Maximum value
     */
    static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate a valid random email
     */
    static generateValidEmail(): string {
        const username = this.randomString(8);
        const domains = ['example.com', 'test.com', 'mail.com', 'company.org'];
        const domain = domains[this.randomNumber(0, domains.length - 1)];
        return `${username}@${domain}`;
    }

    /**
     * Generate an email with subdomain
     */
    static generateSubdomainEmail(): string {
        const username = this.randomString(8);
        return `${username}@mail.company.com`;
    }

    /**
     * Generate a valid password meeting all requirements
     * - At least 8 characters
     * - At least 1 uppercase
     * - At least 1 lowercase
     * - At least 1 number
     * - At least 1 special character
     */
    static generateValidPassword(): string {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*';

        // Ensure at least one of each required character
        let password = '';
        password += uppercase.charAt(this.randomNumber(0, uppercase.length - 1));
        password += lowercase.charAt(this.randomNumber(0, lowercase.length - 1));
        password += numbers.charAt(this.randomNumber(0, numbers.length - 1));
        password += special.charAt(this.randomNumber(0, special.length - 1));

        // Fill remaining with random chars
        const allChars = uppercase + lowercase + numbers + special;
        password += this.randomString(4, allChars);

        // Shuffle the password
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    /**
     * Generate a valid full name
     */
    static generateFullName(): string {
        const firstNames = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Vu', 'Vo'];
        const middleNames = ['Van', 'Thi', 'Minh', 'Quoc', 'Thanh'];
        const lastNames = ['An', 'Binh', 'Cuong', 'Dung', 'Hoa', 'Long', 'Mai'];

        const firstName = firstNames[this.randomNumber(0, firstNames.length - 1)];
        const middleName = middleNames[this.randomNumber(0, middleNames.length - 1)];
        const lastName = lastNames[this.randomNumber(0, lastNames.length - 1)];

        return `${firstName} ${middleName} ${lastName}`;
    }

    /**
     * Generate a valid username (10-15 characters)
     */
    static generateValidUsername(): string {
        const length = this.randomNumber(10, 15);
        return this.randomString(length, 'abcdefghijklmnopqrstuvwxyz0123456789');
    }

    /**
     * Generate valid login credentials
     */
    static generateValidLoginCredentials(): LoginCredentials {
        return {
            email: this.generateValidEmail(),
            password: 'password123', // 11 chars, valid for login (min 6)
        };
    }

    /**
     * Generate valid registration data
     */
    static generateValidRegistrationData(): RegistrationData {
        const password = this.generateValidPassword();
        return {
            fullName: this.generateFullName(),
            username: this.generateValidUsername(),
            email: this.generateValidEmail(),
            password,
            confirmPassword: password,
        };
    }

    /**
     * Get default valid login credentials
     */
    static getDefaultLoginCredentials(): LoginCredentials {
        return {
            email: 'user@example.com',
            password: 'password123',
        };
    }

    /**
     * Get default valid registration data
     */
    static getDefaultRegistrationData(): RegistrationData {
        return {
            fullName: 'Nguyen Van A',
            username: 'testuser1234',
            email: 'test@example.com',
            password: 'Test@123456',
            confirmPassword: 'Test@123456',
        };
    }

    /**
     * Generate password with specific length (with all required characters)
     * @param length - Desired password length
     */
    static generatePasswordWithLength(length: number): string {
        if (length < 4) {
            return this.randomString(length);
        }

        const uppercase = 'A';
        const lowercase = 'a';
        const number = '1';
        const special = '@';

        const remaining = length - 4;
        const filler = this.randomString(remaining, 'abcdefghijklmnopqrstuvwxyz0123456789');

        return (uppercase + lowercase + number + special + filler)
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    }

    /**
     * Generate username with specific length
     * @param length - Desired username length
     */
    static generateUsernameWithLength(length: number): string {
        return this.randomString(length, 'abcdefghijklmnopqrstuvwxyz0123456789');
    }

    /**
     * Get timestamp string for unique identifiers
     */
    static getTimestamp(): string {
        return Date.now().toString();
    }

    /**
     * Generate unique email with timestamp
     */
    static generateUniqueEmail(): string {
        const timestamp = this.getTimestamp();
        return `test_${timestamp}@example.com`;
    }
}
