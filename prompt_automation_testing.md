# 📝 Hướng dẫn Viết Prompt cho Automation Testing

> **Cẩm nang viết prompt hiệu quả** để AI generate code automation chính xác

---

## 📋 Mục lục

1. [Nguyên tắc cơ bản](#1-nguyên-tắc-cơ-bản)
2. [Cấu trúc Prompt chuẩn](#2-cấu-trúc-prompt-chuẩn)
3. [Templates theo Use Case](#3-templates-theo-use-case)
4. [Ví dụ thực tế](#4-ví-dụ-thực-tế)
5. [Sai lầm thường gặp](#5-sai-lầm-thường-gặp)
6. [Tips nâng cao](#6-tips-nâng-cao)

---

## 1. Nguyên tắc cơ bản

### ✅ PROMPT TỐT

| Nguyên tắc | Ví dụ |
|------------|-------|
| **Cụ thể** | "Tạo test cho login với email và password" |
| **Có context** | "Trang login sử dụng React, có id='email'" |
| **Định format** | "Output: TypeScript, Page Object Model" |
| **Có locators** | "Email input: #email, Button: #submitBtn" |

### ❌ PROMPT KHÔNG TỐT

| Sai lầm | Ví dụ |
|---------|-------|
| **Mơ hồ** | "Tạo test cho trang web" |
| **Thiếu info** | "Test login" mà không có locators |
| **Không format** | Không nói dùng ngôn ngữ gì |

---

## 2. Cấu trúc Prompt chuẩn

### 📐 Template cơ bản

```
[ROLE] - Vai trò của AI
[CONTEXT] - Bối cảnh về ứng dụng
[TASK] - Nhiệm vụ cần làm
[INPUT] - Thông tin đầu vào (locators, test data)
[OUTPUT] - Format mong muốn
[CONSTRAINTS] - Ràng buộc/yêu cầu thêm
```

### 📝 Ví dụ áp dụng

```
[ROLE]
Bạn là Senior Automation Engineer với 10 năm kinh nghiệm Playwright.

[CONTEXT]
Ứng dụng web quản lý user, frontend React, form validation client-side.

[TASK]
Tạo Playwright test suite cho trang Login.

[INPUT]
URL: /login.html
Locators:
- Email: #email
- Password: #password
- Login button: #loginBtn
- Error message: .error-text

Test data:
- Valid: user@test.com / Test@123
- Invalid email: invalid-email
- Short password: 123

[OUTPUT]
- TypeScript
- Page Object Model pattern
- Sử dụng @playwright/test
- Comments tiếng Việt

[CONSTRAINTS]
- Không dùng XPath
- Mỗi test case độc lập
- Có cleanup sau mỗi test
```

---

## 3. Templates theo Use Case

### 🔹 Template 1: Tạo Page Object

```
Vai trò: Senior Playwright Developer

Tạo Page Object class cho trang [TÊN TRANG].

Thông tin trang:
- URL: [URL PATH]
- Framework: [FRAMEWORK NẾU BIẾT]

Elements trên trang:
| Element | Selector | Loại |
|---------|----------|------|
| [Tên] | [Selector] | input/button/link/... |
| ... | ... | ... |

Methods cần có:
1. navigate() - Điều hướng đến trang
2. [Tên method] - [Mô tả]
3. ...

Getter methods:
1. getErrorMessage() - Lấy text error
2. [Tên] - [Mô tả]

Output format:
- TypeScript
- Kế thừa từ BasePage nếu có
- JSDoc comments
- Không dùng any type
```

---

### 🔹 Template 2: Convert Manual Test Case

```
Convert manual test case sau thành Playwright automation:

═══════════════════════════════════════════
MANUAL TEST CASE
═══════════════════════════════════════════

[Paste toàn bộ manual test case ở đây]

═══════════════════════════════════════════

Locators (đã inspect từ DevTools):
- [Field 1]: [Selector]
- [Field 2]: [Selector]
- ...

Yêu cầu output:
1. Sử dụng TypeScript + Playwright
2. Tuân theo Page Object Model
3. Assertions đầy đủ cho mỗi expected result
4. Test data ở đầu file dưới dạng const
5. Comments giải thích mỗi step

Nếu test case có preconditions, tạo trong beforeEach hook.
```

---

### 🔹 Template 3: Generate Test Suite từ Requirements

```
Tạo test suite cho feature: [TÊN FEATURE]

Business requirements:
1. [Requirement 1]
2. [Requirement 2]
...

Các scenario cần test:
✓ Happy path (positive)
✓ Negative cases
✓ Boundary cases
✓ Error handling

Page elements:
[Liệt kê locators]

Output bao gồm:
1. Test file với describe blocks theo scenario
2. Mỗi test case có tên mô tả rõ ràng
3. Test data riêng cho mỗi case
4. Cleanup trong afterEach

Ưu tiên:
- P1: Critical path tests
- P2: Common scenarios
- P3: Edge cases
```

---

### 🔹 Template 4: Debug và Fix Lỗi

```
Cần debug lỗi Playwright test.

═══════════════════════════════════════════
ERROR MESSAGE
═══════════════════════════════════════════

[Paste full error từ terminal]

═══════════════════════════════════════════
TEST CODE
═══════════════════════════════════════════

```typescript
[Paste code đang bị lỗi]
```

═══════════════════════════════════════════
HTML ELEMENTS (nếu liên quan)
═══════════════════════════════════════════

```html
[Paste HTML từ DevTools]
```

═══════════════════════════════════════════

Hãy:
1. Phân tích nguyên nhân lỗi
2. Giải thích tại sao xảy ra
3. Đề xuất các cách fix (nếu có nhiều options)
4. Cho code đã sửa hoàn chỉnh
5. Tips để tránh lỗi tương tự
```

---

### 🔹 Template 5: Review và Cải thiện Code

```
Review và cải thiện code Playwright test sau:

```typescript
[Paste code cần review]
```

Đánh giá theo các tiêu chí:
1. [ ] Readability - Dễ đọc, dễ hiểu
2. [ ] Maintainability - Dễ bảo trì
3. [ ] Best practices - Tuân theo best practices
4. [ ] Error handling - Xử lý lỗi tốt
5. [ ] Performance - Không có waits không cần thiết

Output mong muốn:
- Điểm tổng quan (1-10)
- List các issues tìm thấy
- Code đã refactor
- Giải thích các thay đổi
```

---

## 4. Ví dụ thực tế

### 📌 Ví dụ 1: Tạo Login Page Object

**Prompt:**
```
Vai trò: Playwright Automation Expert

Tạo Page Object cho trang Login với thông tin:

URL: file:///Users/kieutb/Documents/automation/login.html

Elements:
| Element | ID/Selector | Mô tả |
|---------|-------------|-------|
| Email input | #email | Input nhập email |
| Password input | #password | Input nhập mật khẩu |
| Login button | #loginBtn | Button đăng nhập |
| Email error | #emailError | Hiển thị lỗi email |
| Password error | #passwordError | Hiển thị lỗi password |
| Register link | a[href="register.html"] | Link đến trang đăng ký |

Methods cần:
1. navigate() - Mở trang login
2. login(email, password) - Thực hiện login
3. getEmailError() - Lấy message lỗi email
4. getPasswordError() - Lấy message lỗi password
5. isEmailFieldInError() - Check có lỗi không
6. clickRegisterLink() - Click vào link đăng ký

Format: TypeScript, Playwright, có JSDoc comments
```

**Kết quả mong đợi:**
```typescript
import { Page, Locator } from '@playwright/test';

/**
 * Page Object cho trang Login
 */
export class LoginPage {
  private page: Page;
  
  // Locators
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private emailError: Locator;
  private passwordError: Locator;
  private registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.emailError = page.locator('#emailError');
    this.passwordError = page.locator('#passwordError');
    this.registerLink = page.locator('a[href="register.html"]');
  }

  /**
   * Điều hướng đến trang login
   */
  async navigate(): Promise<void> {
    await this.page.goto('/login.html');
  }

  /**
   * Thực hiện đăng nhập
   * @param email - Email đăng nhập
   * @param password - Mật khẩu
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Lấy message lỗi email
   */
  async getEmailError(): Promise<string> {
    return await this.emailError.textContent() || '';
  }

  /**
   * Lấy message lỗi password
   */
  async getPasswordError(): Promise<string> {
    return await this.passwordError.textContent() || '';
  }

  /**
   * Kiểm tra email field có đang hiển thị lỗi
   */
  async isEmailFieldInError(): Promise<boolean> {
    return await this.emailError.isVisible();
  }

  /**
   * Click vào link đăng ký
   */
  async clickRegisterLink(): Promise<void> {
    await this.registerLink.click();
  }
}
```

---

## 5. Sai lầm thường gặp

### ❌ Sai lầm 1: Prompt quá mơ hồ

**Không tốt:**
```
Tạo test cho website
```

**Tốt hơn:**
```
Tạo Playwright test cho trang login có:
- Email input (#email)
- Password input (#password)
- Submit button (#submit)

Test case: Login với credentials đúng, redirect đến /dashboard
```

### ❌ Sai lầm 2: Không cung cấp locators

**Không tốt:**
```
Test form đăng ký user
```

**Tốt hơn:**
```
Test form đăng ký với elements:
- Fullname: #fullname
- Email: #email
- Password: #password
- Submit: button[type="submit"]
```

### ❌ Sai lầm 3: Không định nghĩa output format

**Không tốt:**
```
Tạo Page Object cho login page
```

**Tốt hơn:**
```
Tạo Page Object cho login page
Output: TypeScript, Playwright, sử dụng class syntax
Không dùng any, có type đầy đủ
```

---

## 6. Tips nâng cao

### 💡 Tip 1: Chain prompts

Chia nhỏ task phức tạp:

```
Prompt 1: "Tạo base Page class với common methods"
Prompt 2: "Dựa trên BasePage, tạo LoginPage"
Prompt 3: "Tạo test cases sử dụng LoginPage"
```

### 💡 Tip 2: Sử dụng examples

```
Tạo test case tương tự như example sau:

```typescript
test('should show error for empty field', async () => {
  await loginPage.login('', '');
  expect(await loginPage.getEmailError()).toBe('Email is required');
});
```

Nhưng cho scenario: password quá ngắn (< 6 ký tự)
```

### 💡 Tip 3: Iterative improvement

```
Prompt 1: "Tạo basic test"
Prompt 2: "Thêm assertions chi tiết hơn"
Prompt 3: "Thêm error handling"
Prompt 4: "Optimize performance"
```

### 💡 Tip 4: Specify naming conventions

```
Naming conventions cần tuân theo:
- Test file: [feature].spec.ts
- Page Object: [Page]Page.ts
- Test name: should [action] when [condition]
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
```

---

## 📚 Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    PROMPT CHEAT SHEET                       │
├─────────────────────────────────────────────────────────────┤
│ 1. CONTEXT   → Mô tả app/trang cần test                     │
│ 2. TASK      → Nêu rõ cần làm gì                            │
│ 3. LOCATORS  → Cung cấp selectors đã inspect                │
│ 4. FORMAT    → TypeScript/JavaScript, POM/flat              │
│ 5. EXAMPLES  → Cho ví dụ nếu cần style cụ thể              │
├─────────────────────────────────────────────────────────────┤
│ ✅ Nên: Cụ thể, có data, định format, cho context           │
│ ❌ Tránh: Mơ hồ, thiếu info, không format                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Kết luận

> **Prompt tốt = Output tốt**

Đầu tư 5 phút viết prompt chi tiết sẽ tiết kiệm 30 phút fix code sai.

**Quy tắc vàng:**
1. Cụ thể hơn → Code chính xác hơn
2. Có locators → Không cần sửa selectors
3. Cho examples → AI hiểu style bạn muốn
4. Định constraints → Tránh code không mong muốn
