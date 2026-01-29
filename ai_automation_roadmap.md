# 🚀 Lộ Trình Học Automation với AI - Từ Zero Code

> **Dành cho Manual Tester chưa biết lập trình** - Tận dụng GitHub Copilot, Playwright MCP và AI để tạo test scripts tự động

---

## 📋 Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Roadmap 4 Tuần](#2-roadmap-4-tuần)
3. [Tuần 1: Setup & Cơ bản](#3-tuần-1-setup--cơ-bản)
4. [Tuần 2: GitHub Copilot & AI Tools](#4-tuần-2-github-copilot--ai-tools)
5. [Tuần 3: Convert Manual → Automation](#5-tuần-3-convert-manual--automation)
6. [Tuần 4: Playwright MCP & Debug](#6-tuần-4-playwright-mcp--debug)
7. [Template Prompts](#7-template-prompts)
8. [Checklist & Đánh giá](#8-checklist--đánh-giá)

---

## 1. Giới thiệu

### 🎯 Mục tiêu

Sau 4 tuần, bạn sẽ:
- ✅ Tạo automation framework với Playwright
- ✅ Convert manual test cases thành automation scripts
- ✅ Sử dụng AI để generate và debug code
- ✅ Chạy được test suite hoàn chỉnh

### 🤖 AI Tools sẽ học

| Tool | Mục đích | Chi phí |
|------|----------|---------|
| **GitHub Copilot** | Code autocomplete & generation | $10/tháng |
| **Claude/Gemini** | Chat để generate code blocks | Free/Pro |
| **Playwright MCP** | AI tương tác với browser | Free |

### ⚠️ Yêu cầu đầu vào

- Kinh nghiệm Manual Testing
- Hiểu cơ bản về web (biết thế nào là button, form, input)
- **KHÔNG cần** biết lập trình

---

## 2. Roadmap 4 Tuần

```
Tuần 1: Setup              Tuần 2: AI Tools          Tuần 3: Convert           Tuần 4: MCP & Debug
┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│ • Node.js   │         │ • Copilot   │         │ • Manual →  │         │ • MCP setup │
│ • VS Code   │  ──▶    │ • AI Chat   │  ──▶    │   Auto      │  ──▶    │ • Debug     │
│ • DevTools  │         │ • Comment   │         │ • Run tests │         │ • Report    │
│ • Playwright│         │   -driven   │         │ • Page Obj  │         │ • CI/CD     │
└─────────────┘         └─────────────┘         └─────────────┘         └─────────────┘
```

---

## 3. Tuần 1: Setup & Cơ bản

### 🔧 Ngày 1-2: Cài đặt môi trường

```bash
# 1. Cài Node.js từ https://nodejs.org/
node --version  # Phải >= 18

# 2. Cài VS Code từ https://code.visualstudio.com/

# 3. Tạo project Playwright
mkdir my-automation && cd my-automation
npm init playwright@latest
# Chọn: TypeScript, tests folder, Yes for GitHub Actions
```

### 🛠️ VS Code Extensions cần cài

| Extension | Tại sao cần |
|-----------|-------------|
| **GitHub Copilot** | AI generate code |
| **Copilot Chat** | Chat với AI |
| **Playwright Test for VS Code** | Chạy test trong IDE |

### 🔍 Ngày 3-5: Học DevTools (F12)

**Mục tiêu:** Biết cách tìm element để automation

**Thực hành:**
1. Mở browser → F12
2. Click icon 🔍 (Select element)
3. Click vào element trên trang
4. Tìm `id`, `class`, `name` trong HTML

**Ví dụ:** 
```html
<input type="email" id="email" class="form-input">
```
→ Selector: `#email` (dùng id) hoặc `.form-input` (dùng class)

### 📝 Ngày 6-7: Chạy test đầu tiên

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('my first test', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle(/Google/);
});
```

Chạy test:
```bash
npx playwright test
```

---

## 4. Tuần 2: GitHub Copilot & AI Tools

### 🤖 Cách dùng GitHub Copilot

#### Cách 1: Comment → Code

Viết comment mô tả → Copilot generate code

```typescript
// Tạo function để login với email và password
// Input: email string, password string
// Output: void
// Steps: fill email, fill password, click login button

// [Đợi Copilot generate code ở đây]
```

#### Cách 2: Copilot Chat (Ctrl+Shift+I)

```
Prompt: Tạo Playwright test cho form login có:
- Email input với id="email"
- Password input với id="password"
- Login button với id="loginBtn"
Tạo test case: login thành công và login thất bại
```

### 💬 Sử dụng Claude/Gemini Chat

**Prompt template:**

```
Tôi là Manual Tester học automation. Cần tạo Playwright test cho:

Trang: Login page
URL: /login.html

Elements:
- Email: id="email"
- Password: id="password"
- Button: id="loginBtn"
- Error: class="error-message"

Tạo:
1. Page Object Model class
2. 3 test cases (positive + negative)
3. Comments tiếng Việt giải thích

Format: TypeScript, Playwright
```

### 🎯 Bài tập tuần 2

- [ ] Tạo 1 Page Object bằng Copilot
- [ ] Generate 3 test cases với AI Chat
- [ ] Chạy và fix lỗi (nếu có)

---

## 5. Tuần 3: Convert Manual → Automation

### 📝 Quy trình chuyển đổi

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Lấy Manual Test Case (Excel/Word/MD)                     │
├─────────────────────────────────────────────────────────────┤
│ 2. Inspect elements → Lấy locators (id, class, name)        │
├─────────────────────────────────────────────────────────────┤
│ 3. Tạo Prompt với format chuẩn                              │
├─────────────────────────────────────────────────────────────┤
│ 4. Paste vào AI (Copilot/Claude/Gemini)                     │
├─────────────────────────────────────────────────────────────┤
│ 5. Review code → Chạy test → Fix nếu cần                    │
└─────────────────────────────────────────────────────────────┘
```

### 📋 Ví dụ chuyển đổi

**Manual Test Case:**
```
TC_LOGIN_001: Đăng nhập thành công

Preconditions:
- User có tài khoản: test@email.com / Pass@123

Steps:
1. Mở trang login.html
2. Nhập email: test@email.com
3. Nhập password: Pass@123
4. Click "Đăng nhập"

Expected:
- Redirect đến dashboard.html
```

**Prompt cho AI:**
```
Convert test case sau thành Playwright script:

[Paste manual test case]

Locators:
- Email: #email
- Password: #password
- Login button: #loginBtn

Yêu cầu:
- TypeScript + Playwright
- Page Object Model
- Comments giải thích
- Assertions đầy đủ
```

**Kết quả từ AI:**
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test('TC_LOGIN_001: Đăng nhập thành công', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Step 1: Mở trang login
    await loginPage.navigate();
    
    // Step 2-3: Nhập credentials
    await loginPage.login('test@email.com', 'Pass@123');
    
    // Expected: Redirect đến dashboard
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### 🎯 Bài tập tuần 3

- [ ] Convert 5 manual test cases
- [ ] Tạo Page Objects cho Login, Register
- [ ] Chạy test suite đầy đủ

---

## 6. Tuần 4: Playwright MCP & Debug

### 🔌 Playwright MCP là gì?

Playwright MCP (Model Context Protocol) cho phép AI **tương tác trực tiếp với browser**:
- Tự động mở trang web
- Inspect elements chính xác
- Generate locators tự động
- Screenshot và analyze UI

### 🛠️ Setup Playwright MCP

**Với Claude Desktop:**
1. Mở Claude Desktop → Settings
2. Thêm MCP Server: `playwright`
3. Grant permissions

**Sử dụng:**
```
Claude, navigate đến file:///Users/kieutb/Documents/automation/login.html
Sau đó:
1. Liệt kê tất cả form elements
2. Tạo Page Object Model
3. Generate 5 test cases covering validation
```

### 🐛 Debug với AI

**Khi gặp lỗi:**

```
Prompt: Tôi chạy test và gặp lỗi:

Error: Timeout 30000ms exceeded.
=========================== logs ===========================
waiting for locator('#loginBtn')

Code:
[Paste code]

HTML:
[Paste HTML từ DevTools]

Hãy giải thích lỗi và fix giúp tôi.
```

**Các lỗi phổ biến:**

| Lỗi | Nguyên nhân | Fix |
|-----|-------------|-----|
| Timeout | Element chưa load | Thêm `waitFor` |
| Not visible | Element bị ẩn | Check `display: none` |
| Strict mode | Nhiều element match | Dùng locator cụ thể hơn |

### 📊 Generate Reports

```bash
# Chạy test và generate report
npx playwright test --reporter=html

# Mở report
npx playwright show-report
```

---

## 7. Template Prompts

### 📄 Prompt 1: Tạo Page Object

```
Tạo Playwright Page Object class cho trang [TÊN TRANG].

URL: [URL]

Elements:
- [Element 1]: [selector]
- [Element 2]: [selector]
...

Methods cần có:
- navigate()
- [action methods]
- [getter methods]

Format: TypeScript, kế thừa BasePage
```

### 📄 Prompt 2: Convert Manual Test Case

```
Convert manual test case sau thành Playwright automation script:

---
[PASTE MANUAL TEST CASE]
---

Locators (đã inspect):
- [Field]: [selector]
...

Yêu cầu:
1. TypeScript + Playwright
2. Page Object Model pattern
3. Assertions đầy đủ
4. Comments tiếng Việt
5. Test data trong biến riêng
```

### 📄 Prompt 3: Generate Test Suite

```
Tạo Playwright test suite cho [FEATURE].

Scenarios cần test:
1. [Scenario 1]
2. [Scenario 2]
...

Mỗi test case cần:
- Clear test name
- Precondition setup
- Action steps
- Assertions
- Cleanup if needed

Locators:
[Liệt kê locators]
```

### 📄 Prompt 4: Debug Error

```
Tôi gặp lỗi khi chạy Playwright test:

ERROR:
---
[PASTE ERROR MESSAGE]
---

CODE:
---
[PASTE CODE]
---

HTML (nếu liên quan):
---
[PASTE HTML]
---

Hãy:
1. Giải thích nguyên nhân
2. Đề xuất solution
3. Cho code đã fix
```

---

## 8. Checklist & Đánh giá

### ✅ Tuần 1 Checklist
- [ ] Cài đặt Node.js + VS Code
- [ ] Cài GitHub Copilot extension
- [ ] Tạo Playwright project thành công
- [ ] Hiểu cách inspect elements (DevTools)
- [ ] Chạy được test đầu tiên

### ✅ Tuần 2 Checklist
- [ ] Dùng Copilot generate code từ comments
- [ ] Sử dụng Copilot Chat tạo test
- [ ] Tạo được 1 Page Object với AI
- [ ] Hiểu cấu trúc Playwright test

### ✅ Tuần 3 Checklist
- [ ] Convert 5 manual test cases
- [ ] Tạo 3 Page Objects
- [ ] Chạy được test suite > 10 tests
- [ ] Hiểu Page Object Model pattern

### ✅ Tuần 4 Checklist
- [ ] Setup Playwright MCP (nếu có)
- [ ] Debug 5 test failures với AI
- [ ] Generate HTML report
- [ ] Tích hợp với CI/CD (optional)

---

## 📚 Tài liệu tham khảo

### 📖 Tài liệu trong Project

| File | Mô tả |
|------|-------|
| [prompt_automation_testing.md](prompt_automation_testing.md) | Hướng dẫn viết prompt cho automation |
| [ai_strategy_guide.md](ai_strategy_guide.md) | Chiến lược làm việc với AI, quản lý context |
| [training_roadmap.md](training_roadmap.md) | Lộ trình học 10 tuần (có học code) |
| [prompt_playwright_framework.md](prompt_playwright_framework.md) | Template prompt tạo framework |
| [prompt_test_cases.md](prompt_test_cases.md) | Template prompt tạo test cases |

### 🌐 Tài liệu Online

| Resource | Link |
|----------|------|
| Playwright Docs | https://playwright.dev/docs/intro |
| GitHub Copilot | https://github.com/features/copilot |
| Playwright MCP | https://github.com/microsoft/playwright-mcp |

---

## 🎉 Kết luận

```
Manual Tester + AI = Automation Engineer 🚀

Không cần:              Chỉ cần:
❌ Học code 6 tháng     ✅ 4 tuần với AI
❌ Hiểu sâu JavaScript  ✅ Biết viết prompt
❌ Tự viết từ đầu       ✅ Review & fix code
```

**Bắt đầu ngay hôm nay!** 💪
