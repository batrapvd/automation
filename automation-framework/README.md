# Automation Framework with Playwright + Page Object Model

A complete automation testing framework using **Playwright** with **Page Object Model (POM)** pattern for testing the Auth System application.

## 📋 Features

- ✅ **Page Object Model** - Clean separation of test logic and page interactions
- ✅ **TypeScript** - Type-safe code with excellent IDE support
- ✅ **Multi-Browser** - Test on Chromium, Firefox, WebKit, and Mobile
- ✅ **Multi-Environment** - Support for SIT, UAT, and Production environments
- ✅ **Custom Fixtures** - Pre-configured page objects and utilities
- ✅ **Centralized Locators** - Easy maintenance when UI changes
- ✅ **Comprehensive Reporting** - HTML, JSON, and JUnit reports
- ✅ **CI/CD Ready** - GitHub Actions workflow included

## 🏗️ Project Structure

```
automation-framework/
├── playwright.config.ts       # Playwright configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables
├── .env.example              # Environment template
│
├── src/
│   ├── pages/                # Page Object Models
│   │   ├── BasePage.ts       # Abstract base class
│   │   ├── LoginPage.ts      # Login page interactions
│   │   ├── RegisterPage.ts   # Register page interactions
│   │   └── DashboardPage.ts  # Dashboard page interactions
│   │
│   ├── components/           # Reusable UI components
│   │   ├── NavigationComponent.ts
│   │   └── FormComponent.ts
│   │
│   ├── locators/             # Centralized selectors
│   │   ├── LoginLocators.ts
│   │   ├── RegisterLocators.ts
│   │   └── DashboardLocators.ts
│   │
│   ├── fixtures/             # Custom Playwright fixtures
│   │   └── test-fixtures.ts
│   │
│   ├── utils/                # Helper utilities
│   │   ├── TestDataGenerator.ts
│   │   ├── WaitHelper.ts
│   │   └── AssertionHelper.ts
│   │
│   └── types/                # TypeScript interfaces
│       └── index.ts
│
├── tests/                    # Test specifications
│   ├── login/
│   │   └── login.spec.ts
│   ├── register/
│   │   └── register.spec.ts
│   ├── dashboard/
│   │   └── dashboard.spec.ts
│   └── e2e/
│       └── user-journey.spec.ts
│
├── test-data/                # Test data files
│   └── users.json
│
├── reports/                  # Generated reports
│   └── .gitkeep
│
└── .github/
    └── workflows/
        └── playwright.yml    # CI/CD pipeline
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to framework directory
cd automation-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:login
npm run test:register
npm run test:dashboard
npm run test:e2e

# Run tests with UI mode
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

### Browser-Specific Tests

```bash
# Run on specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

### Environment-Specific Tests

```bash
# Run on SIT environment
npm run test:sit

# Run on UAT environment
npm run test:uat

# Run on Production environment
npm run test:prod
```

## 📊 Viewing Reports

```bash
# Open HTML report
npm run report

# Or manually
npx playwright show-report reports/html
```

## 🧪 Test Coverage

### Login Page Tests
| Test ID | Description |
|---------|-------------|
| TC_LOGIN_001 | Login success with valid credentials |
| TC_LOGIN_002 | Login with subdomain email |
| TC_LOGIN_008-010 | Password boundary tests (6-7 chars) |
| TC_LOGIN_011-013 | UI tests (placeholders, hover, focus) |
| TC_LOGIN_014 | Password masking |
| TC_LOGIN_016-017 | Navigation tests |

### Register Page Tests
| Test ID | Description |
|---------|-------------|
| TC_REG_001-002 | Successful registration |
| TC_REG_013-017 | Boundary tests (username, password length) |
| TC_REG_019 | Real-time password validation |
| TC_REG_023 | Password masking |
| TC_REG_025-026 | Navigation tests |

### Dashboard Page Tests
| Test ID | Description |
|---------|-------------|
| TC_DASH_001 | User info from localStorage |
| TC_DASH_002-004 | Stats and activity table display |
| TC_DASH_005-006 | Logout functionality |
| TC_DASH_007-010 | UI element verification |

### E2E Tests
- Complete user registration and login journey
- Navigation between pages
- Session persistence
- Dashboard interactions

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Base URL for testing
BASE_URL=file:///Users/kieutb/Documents/automation/

# Test credentials
TEST_USER_EMAIL=user@example.com
TEST_USER_PASSWORD=password123

# Environment
ENV=sit
```

### Playwright Configuration

Key settings in `playwright.config.ts`:

- **Timeout**: 30 seconds per test
- **Retries**: 1 on local, 2 on CI
- **Workers**: 4 parallel workers
- **Screenshots**: On failure only
- **Video**: Retain on failure
- **Trace**: On first retry

## 📝 Writing Tests

### Using Custom Fixtures

```typescript
import { test, expect } from '../../src/fixtures/test-fixtures';

test('example test', async ({ loginPage, testData }) => {
  // Page objects are pre-initialized
  await loginPage.navigate();
  
  // Use test data generator
  const email = testData.generateValidEmail();
  
  await loginPage.login(email, 'password123');
  await expect(loginPage['page']).toHaveURL(/dashboard/);
});
```

### Page Object Methods

```typescript
// Login Page
await loginPage.navigate();
await loginPage.login(email, password);
await loginPage.isEmailFieldInError();
await loginPage.clickRegisterLink();

// Register Page
await registerPage.register(data);
await registerPage.isPasswordRequirementValid('uppercase');
await registerPage.areAllPasswordRequirementsMet();

// Dashboard Page
await dashboardPage.getUserInfo();
await dashboardPage.clickNavItem('Analytics');
await dashboardPage.clickLogout();
```

## 🔄 CI/CD

The GitHub Actions workflow runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual trigger with environment/browser selection

### Manual Workflow Trigger

1. Go to Actions tab in GitHub
2. Select "Playwright Tests" workflow
3. Click "Run workflow"
4. Select environment and browser

## 📈 Best Practices Implemented

1. ✅ **DRY** - Reusable page objects and utilities
2. ✅ **Single Responsibility** - Each class has one purpose
3. ✅ **Meaningful Naming** - Clear method and variable names
4. ✅ **Type Safety** - Full TypeScript implementation
5. ✅ **Error Handling** - Graceful handling of failures
6. ✅ **Documentation** - JSDoc comments throughout
7. ✅ **Maintainability** - Centralized locators and config

## 🤝 Contributing

1. Create a feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Submit a pull request

## 📄 License

MIT License
