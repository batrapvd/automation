# PROMPT: Thiết kế Automation Framework với Playwright + POM

## Mục đích
Bạn là một Senior Automation Engineer. Hãy thiết kế một automation testing framework hoàn chỉnh sử dụng **Playwright** với **Page Object Model (POM)** để test 3 trang: Login, Register, và Dashboard chạy được trên nhiều môi trường như sit, uat, và production.

## Test case manual: auth_system_manual_test_cases.md

---

## Thông tin về Application cần test

### Technology Stack
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Styling:** Modern CSS với glassmorphism
- **State Management:** localStorage (demo)
- **No Backend:** Static pages, form validation client-side

### Pages và URLs
```
Base URL: file:///Users/kieutb/Documents/automation/
- Login: login.html
- Register: register.html  
- Dashboard: dashboard.html
```

---

## Yêu cầu Framework Design

### 1. Project Structure
Thiết kế folder structure theo chuẩn:

```
automation-framework/
├── playwright.config.ts       # Playwright configuration
├── package.json
├── tsconfig.json
├── .env                       # Environment variables
├── .env.example
│
├── src/
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.ts        # Base class cho tất cả pages
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   └── DashboardPage.ts
│   │
│   ├── components/            # Reusable components
│   │   ├── NavigationComponent.ts
│   │   └── FormComponent.ts
│   │
│   ├── locators/              # Centralized locators
│   │   ├── LoginLocators.ts
│   │   ├── RegisterLocators.ts
│   │   └── DashboardLocators.ts
│   │
│   ├── fixtures/              # Custom fixtures
│   │   └── test-fixtures.ts
│   │
│   ├── utils/                 # Helper utilities
│   │   ├── TestDataGenerator.ts
│   │   ├── WaitHelper.ts
│   │   └── AssertionHelper.ts
│   │
│   └── types/                 # TypeScript interfaces
│       └── index.ts
│
├── tests/                     # Test files
│   ├── login/
│   │   ├── login.spec.ts
│   │   └── login-negative.spec.ts
│   ├── register/
│   │   ├── register.spec.ts
│   │   └── register-negative.spec.ts
│   ├── dashboard/
│   │   └── dashboard.spec.ts
│   └── e2e/
│       └── user-journey.spec.ts
│
├── test-data/                 # Test data files
│   ├── users.json
│   └── invalid-inputs.json
│
└── reports/                   # Test reports
    └── .gitkeep
```

---

### 2. Locator Strategy

Thiết kế file lưu trữ locators cho từng page:

#### LoginLocators.ts
```typescript
export const LoginLocators = {
  // Input fields
  emailInput: '#email',
  passwordInput: '#password',
  
  // Buttons
  loginButton: '#loginBtn',
  
  // Links
  registerLink: 'a[href="register.html"]',
  
  // Error elements
  emailError: '#emailError',
  passwordError: '#passwordError',
  emailGroup: '#emailGroup',
  passwordGroup: '#passwordGroup',
  
  // CSS classes for validation
  errorClass: '.error'
} as const;
```

Yêu cầu:
- Sử dụng **CSS selectors** hoặc **ID** làm primary strategy
- Fallback sang **data-testid** nếu cần
- **KHÔNG** sử dụng XPath trừ khi bắt buộc
- Locators phải **stable** và **unique**

---

### 3. Page Object Model Implementation

#### BasePage.ts
```typescript
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || '';
  }

  // Common methods
  abstract navigate(): Promise<void>;
  
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
  }
}
```

#### LoginPage.ts
Yêu cầu methods:
- `navigate()` - Điều hướng đến login page
- `login(email, password)` - Thực hiện login
- `getEmailErrorMessage()` - Lấy error message của email
- `getPasswordErrorMessage()` - Lấy error message của password
- `isEmailFieldInError()` - Kiểm tra email field có error
- `clickRegisterLink()` - Click vào link đăng ký
- `isLoginButtonEnabled()` - Kiểm tra button có enabled

---

### 4. Test Structure

#### Cấu trúc test file
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async () => {
    await loginPage.login('user@example.com', 'password123');
    // assertions
  });

  test('should show error for invalid email format', async () => {
    await loginPage.login('invalid-email', 'password123');
    expect(await loginPage.isEmailFieldInError()).toBe(true);
  });
});
```

---

### 5. Configuration Requirements

#### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: 4,
  
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list']
  ],

  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
```

---

### 6. Utility Classes

#### TestDataGenerator.ts
- Tạo random valid email
- Tạo random password với rules
- Tạo random fullname
- Load test data từ JSON files

#### WaitHelper.ts
- Wait for element visible
- Wait for element hidden
- Wait for network idle
- Custom wait conditions

---

### 7. Reporting Requirements

- **HTML Report:** Chi tiết, có screenshots
- **JSON Report:** Để integrate với CI/CD
- **Console output:** Summary results
- **Screenshots:** On failure
- **Video recording:** On retry

---

### 8. CI/CD Integration

Tạo GitHub Actions workflow:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: reports/
```

---

## Output mong đợi

Hãy generate code đầy đủ cho:

1. **Tất cả Page Objects** với methods và locators
2. **Locator files** riêng biệt
3. **Base classes và utilities**
4. **Sample test cases** cho mỗi page
5. **Configuration files** (playwright.config, package.json, tsconfig)
6. **README** hướng dẫn setup và run tests

---

## Best Practices cần tuân thủ

1. ✅ **DRY (Don't Repeat Yourself)** - Tái sử dụng code
2. ✅ **Single Responsibility** - Mỗi class/method 1 nhiệm vụ
3. ✅ **Meaningful naming** - Tên biến/method rõ ràng
4. ✅ **Type safety** - Sử dụng TypeScript đúng cách
5. ✅ **Error handling** - Xử lý lỗi gracefully
6. ✅ **Documentation** - Comment và JSDoc
7. ✅ **Maintainability** - Dễ maintain và mở rộng

Hãy generate framework design hoàn chỉnh theo các yêu cầu trên!
