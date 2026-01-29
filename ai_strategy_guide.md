# 🧠 Chiến Lược Làm Việc với AI cho Automation Testing

> **Hướng dẫn toàn diện** về cách lên kế hoạch, tạo prompt, và quản lý context khi sử dụng AI

---

## 📋 Mục lục

1. [Quy trình làm việc với AI](#1-quy-trình-làm-việc-với-ai)
2. [Lên kế hoạch trước khi cho AI tạo script](#2-lên-kế-hoạch-trước-khi-cho-ai-tạo-script)
3. [Vòng lặp Tạo - Sửa - Review Prompt](#3-vòng-lặp-tạo---sửa---review-prompt)
4. [Chiến lược thêm test vào project có sẵn](#4-chiến-lược-thêm-test-vào-project-có-sẵn)
5. [Quản lý Context lớn cho AI](#5-quản-lý-context-lớn-cho-ai)
6. [Tránh duplicate khi AI tạo code](#6-tránh-duplicate-khi-ai-tạo-code)
7. [Templates và Checklists](#7-templates-và-checklists)

---

## 1. Quy trình làm việc với AI

### 🔄 Workflow tổng quan

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI AUTOMATION WORKFLOW                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐          │
│  │ PHASE 1 │───▶│ PHASE 2 │───▶│ PHASE 3 │───▶│ PHASE 4 │          │
│  │ Plan    │    │ Prompt  │    │ Execute │    │ Review  │          │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘          │
│       │              │              │              │                │
│       ▼              ▼              ▼              ▼                │
│  • Phân tích    • Viết draft   • Cho AI chạy  • Review code        │
│  • Inventory    • Review       • Kiểm tra     • Chạy test          │
│  • Lên scope    • Sửa prompt   • Fix lỗi      • Refactor           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### ⏱️ Phân bổ thời gian

| Phase | Thời gian | Mô tả |
|-------|-----------|-------|
| Planning | 30% | Phân tích, lên scope, chuẩn bị context |
| Prompt | 20% | Viết, sửa, review prompt |
| Execute | 30% | AI generate, fix lỗi |
| Review | 20% | Review, refactor, test |

> 💡 **Key insight:** Đầu tư thời gian vào Planning sẽ giảm đáng kể thời gian fix lỗi ở Execute phase.

---

## 2. Lên kế hoạch trước khi cho AI tạo script

### 📝 Step 1: Phân tích hiện trạng

**Checklist phân tích:**

```markdown
## Project Analysis Checklist

### Cấu trúc project
- [ ] Đã có automation framework chưa? (Yes/No)
- [ ] Framework hiện tại: [Playwright/Cypress/Selenium/...]
- [ ] Ngôn ngữ: [TypeScript/JavaScript/Python/...]
- [ ] Pattern đang dùng: [POM/Screenplay/Custom/...]

### Code hiện có
- [ ] Số Page Objects: ___
- [ ] Số test files: ___
- [ ] Số test cases: ___
- [ ] Utilities/Helpers: [Liệt kê]

### Elements đã có locators
- [ ] Login page: [Yes/No]
- [ ] Register page: [Yes/No]
- [ ] [Các pages khác]: [Yes/No]
```

### 📝 Step 2: Xác định scope

**Scope Planning Template:**

```markdown
## Scope Definition

### Mục tiêu
- [ ] Tạo mới framework từ đầu
- [ ] Thêm test vào project có sẵn
- [ ] Refactor code hiện tại

### Features cần test
| Priority | Feature | Số test cases ước tính |
|----------|---------|------------------------|
| P1 | [Feature name] | [số] |
| P2 | [Feature name] | [số] |
| P3 | [Feature name] | [số] |

### Deliverables
1. [ ] Page Objects cho: [liệt kê pages]
2. [ ] Test cases cho: [liệt kê scenarios]
3. [ ] Utilities: [liệt kê helpers cần tạo]
```

### 📝 Step 3: Thu thập context

**Context Gathering Checklist:**

```markdown
## Context Preparation

### Application context
- [ ] URLs của các environments (DEV/SIT/UAT/PROD)
- [ ] Credentials test accounts
- [ ] Test data requirements

### Technical context
- [ ] HTML structure của các pages chính
- [ ] Locators cho key elements
- [ ] JavaScript frameworks (React/Vue/Angular)
- [ ] Special behaviors (lazy loading, SPAs, iframes)

### Existing code context
- [ ] BasePage class (nếu có)
- [ ] Existing Page Objects
- [ ] Existing utilities
- [ ] Config files (playwright.config.ts)
```

---

## 3. Vòng lặp Tạo - Sửa - Review Prompt

### 🔄 Iterative Prompt Development

```
         ┌──────────────────────────────────────┐
         │         PROMPT ITERATION LOOP        │
         └──────────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │  1. DRAFT PROMPT                    │
         │  - Viết prompt ban đầu              │
         │  - Include context cơ bản           │
         └─────────────────┬───────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │  2. SELF-REVIEW                     │
         │  - Đủ context chưa?                 │
         │  - Locators đầy đủ?                 │
         │  - Format rõ ràng?                  │
         └─────────────────┬───────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │  3. TEST RUN                        │
         │  - Cho AI generate                  │
         │  - Đánh giá output                  │
         └─────────────────┬───────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │  4. REFINE                          │
    ┌───▶│  - Thêm constraints nếu cần        │
    │    │  - Bổ sung context thiếu           │
    │    │  - Làm rõ requirements             │
    │    └─────────────────┬───────────────────┘
    │                      │
    │                      ▼
    │    ┌─────────────────────────────────────┐
    │    │  Output đạt yêu cầu?               │
    │    │  ┌─────┐        ┌─────┐            │
    │    │  │ NO  │        │ YES │            │
    │    │  └──┬──┘        └──┬──┘            │
    │    └─────┼──────────────┼───────────────┘
    │          │              │
    └──────────┘              ▼
                        ┌─────────────┐
                        │    DONE     │
                        └─────────────┘
```

### 📋 Prompt Review Checklist

```markdown
## Prompt Quality Review

### Clarity (Độ rõ ràng)
- [ ] Mục tiêu rõ ràng không?
- [ ] AI có thể hiểu nhầm không?
- [ ] Có mâu thuẫn trong yêu cầu không?

### Completeness (Độ đầy đủ)
- [ ] Đủ context về application?
- [ ] Đủ locators cho tất cả elements?
- [ ] Đủ test data?
- [ ] Đủ expected results?

### Constraints (Ràng buộc)
- [ ] Định nghĩa output format?
- [ ] Yêu cầu tuân theo pattern hiện có?
- [ ] Cấm những gì không muốn?

### Examples (Ví dụ)
- [ ] Có example code để AI tham khảo?
- [ ] Có example output mong muốn?
```

---

## 4. Chiến lược thêm test vào project có sẵn

### 🎯 Nguyên tắc chính

| Nguyên tắc | Mô tả |
|------------|-------|
| **Consistency** | Code mới phải consistent với code hiện có |
| **Reusability** | Tái sử dụng những gì đã có |
| **Non-breaking** | Không làm hỏng test hiện tại |
| **Incremental** | Thêm từng phần nhỏ, test từng bước |

### 📊 Quy trình thêm test vào project có sẵn

#### Phase 1: Inventory

```markdown
## Existing Code Inventory

### Page Objects hiện có
| Page Object | File Path | Methods |
|-------------|-----------|---------|
| LoginPage | src/pages/LoginPage.ts | login(), getError()... |
| [Tên khác] | [Path] | [Methods] |

### Utilities hiện có
| Utility | File Path | Functions |
|---------|-----------|-----------|
| TestDataGenerator | src/utils/TestDataGenerator.ts | randomEmail()... |
| [Tên khác] | [Path] | [Functions] |

### Locators hiện có
| Locator File | Elements covered |
|--------------|------------------|
| LoginLocators.ts | email, password, loginBtn... |
| [File khác] | [Elements] |
```

#### Phase 2: Gap Analysis

```markdown
## Gap Analysis

### Cần thêm Page Objects
| Page | Status | Priority |
|------|--------|----------|
| SettingsPage | Missing | P1 |
| ProfilePage | Partial | P2 |

### Cần thêm Test Cases
| Feature | Existing Tests | Needed Tests | Gap |
|---------|----------------|--------------|-----|
| Login | 5 | 15 | 10 |
| Register | 0 | 20 | 20 |

### Cần thêm Utilities
| Utility | Purpose |
|---------|---------|
| WaitHelper | Explicit waits |
| AssertHelper | Custom assertions |
```

#### Phase 3: Cho AI hiểu context hiện có

**Prompt template để AI hiểu project:**

```
Tôi có automation project Playwright với cấu trúc sau:

## Cấu trúc thư mục
```
src/
├── pages/
│   ├── BasePage.ts      # [Paste content]
│   └── LoginPage.ts     # [Paste content]
├── locators/
│   └── LoginLocators.ts # [Paste content]
└── utils/
    └── TestDataGenerator.ts # [Paste content]
```

## Conventions đang dùng
- Locators: Tách riêng file, export as const
- Page Objects: Kế thừa BasePage, constructor nhận Page
- Test files: Dùng describe/test blocks

## YÊU CẦU
Tạo thêm [RegisterPage] theo đúng pattern hiện có:
1. Kế thừa BasePage
2. Import locators từ RegisterLocators
3. Methods naming: camelCase
4. Có JSDoc comments
```

---

## 5. Quản lý Context lớn cho AI

### 🧩 Vấn đề: AI có giới hạn context

AI có giới hạn số tokens có thể xử lý → Cần chiến lược quản lý context hiệu quả.

### 📦 Chiến lược 1: Context Layering

```
┌───────────────────────────────────────────────────────────┐
│                    CONTEXT LAYERS                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Layer 1: ALWAYS INCLUDE (Core context)                   │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ • Project conventions (naming, patterns)            │  │
│  │ • BasePage class                                    │  │
│  │ • Config files structure                            │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  Layer 2: INCLUDE WHEN RELEVANT                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ • Related Page Objects (same feature)               │  │
│  │ • Related test files                                │  │
│  │ • Specific utilities được dùng                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  Layer 3: SUMMARIZE (Don't paste full)                    │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ • List of other Page Objects (chỉ tên + methods)    │  │
│  │ • List of utilities (chỉ tên + mô tả)               │  │
│  │ • Overall project structure                         │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### 📦 Chiến lược 2: Context Summary File

Tạo file `CONTEXT.md` trong project:

```markdown
# Project Context for AI

## Technology Stack
- Framework: Playwright
- Language: TypeScript
- Pattern: Page Object Model

## Conventions
- Locators: Separate files in `src/locators/`
- Pages: Extend BasePage in `src/pages/`
- Tests: In `tests/` folder, grouped by feature

## Existing Components

### Page Objects
1. **BasePage** - Common methods: navigate(), waitForLoad(), screenshot()
2. **LoginPage** - Methods: login(), getError(), clickRegister()
3. **DashboardPage** - Methods: getUserName(), logout()

### Utilities
1. **TestDataGenerator** - randomEmail(), randomPassword(), randomName()
2. **WaitHelper** - waitForVisible(), waitForHidden()

### Locators Pattern
```typescript
export const PageLocators = {
  elementName: '#selector',
} as const;
```

## DO NOT DUPLICATE
The following already exist, REUSE them:
- Login functionality → Use LoginPage.login()
- Random data → Use TestDataGenerator
- Wait operations → Use WaitHelper
```

### 📦 Chiến lược 3: Modular Prompts

Thay vì 1 prompt lớn, chia thành nhiều prompts nhỏ:

```
Prompt 1: "Tạo RegisterLocators.ts dựa trên pattern LoginLocators.ts"
    ↓
Prompt 2: "Tạo RegisterPage.ts sử dụng RegisterLocators, kế thừa BasePage"
    ↓
Prompt 3: "Tạo register.spec.ts sử dụng RegisterPage đã tạo"
```

---

## 6. Tránh duplicate khi AI tạo code

### 🚫 Anti-Duplication Strategies

#### Strategy 1: Explicit "DO NOT" Instructions

```
YÊU CẦU QUAN TRỌNG - KHÔNG DUPLICATE:

❌ KHÔNG tạo mới:
- Login functionality (đã có LoginPage.login())
- Random email generator (đã có TestDataGenerator.randomEmail())
- Wait helper (đã có WaitHelper.ts)

✅ HÃY SỬ DỤNG:
- Import LoginPage từ '../pages/LoginPage'
- Import TestDataGenerator từ '../utils/TestDataGenerator'
- Import WaitHelper từ '../utils/WaitHelper'
```

#### Strategy 2: Provide Existing Imports

```typescript
// Trong prompt, cho sẵn phần imports:
// Sử dụng các imports sau, KHÔNG tạo mới:

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { TestDataGenerator } from '../utils/TestDataGenerator';
import { WaitHelper } from '../utils/WaitHelper';

// Bây giờ tạo test cases sử dụng các components trên
```

#### Strategy 3: Reference Existing Methods

```
Tạo test case cho checkout flow.

EXISTING METHODS TO USE (không tạo mới):
- loginPage.login(email, password) - Đăng nhập
- cartPage.addItem(itemId) - Thêm item vào cart
- cartPage.getTotal() - Lấy tổng tiền

NEW METHODS NEEDED:
- checkoutPage.fillShippingInfo() - Cần tạo
- checkoutPage.submitOrder() - Cần tạo
```

### 📋 Duplicate Prevention Checklist

```markdown
## Before Sending Prompt

- [ ] Liệt kê rõ những gì ĐÃ CÓ
- [ ] Nói rõ cần REUSE gì
- [ ] Nói rõ cần TẠO MỚI gì
- [ ] Cho import statements sẵn có
- [ ] Cho ví dụ cách sử dụng code hiện có
```

---

## 7. Templates và Checklists

### 📄 Master Template: Full Project Context

```markdown
# AI Context for [PROJECT NAME]

## 1. Project Overview
- **Purpose:** [Mô tả project]
- **Tech Stack:** Playwright + TypeScript
- **Pattern:** Page Object Model

## 2. Directory Structure
```
[Paste tree structure]
```

## 3. Conventions
### Naming
- Files: kebab-case.ts
- Classes: PascalCase
- Methods: camelCase
- Constants: UPPER_SNAKE_CASE

### Patterns
- Page Objects extend BasePage
- Locators in separate files
- Tests grouped by feature

## 4. Existing Components
### Reusable (DO NOT recreate)
| Component | Import Path | Key Methods |
|-----------|-------------|-------------|
| [Name] | [Path] | [Methods] |

### Available Utilities
| Utility | Purpose | Example Usage |
|---------|---------|---------------|
| [Name] | [Purpose] | [Code example] |

## 5. Current Task
### Goal
[Mô tả mục tiêu]

### Scope
- [ ] Create: [What to create]
- [ ] Modify: [What to modify]
- [ ] Use existing: [What to reuse]

## 6. Constraints
- ❌ DO NOT: [List restrictions]
- ✅ MUST: [List requirements]
```

### 📄 Quick Checklist: Before AI Session

```markdown
## Pre-AI Session Checklist

### Context Preparation
- [ ] CONTEXT.md file updated?
- [ ] Relevant existing code copied?
- [ ] Locators inspected and ready?

### Scope Definition
- [ ] Clear goal defined?
- [ ] Deliverables listed?
- [ ] "Do not duplicate" list ready?

### Prompt Structure
- [ ] Context layer 1 included?
- [ ] Constraints clearly stated?
- [ ] Output format specified?
- [ ] Examples provided if needed?

### Review Plan
- [ ] Know what to review in output?
- [ ] Know how to test generated code?
```

---

## 🎯 Kết luận

### Key Takeaways

1. **Planning trước 30%** → Giảm errors 50%
2. **Context rõ ràng** → Output chính xác
3. **Iterate prompts** → Continuous improvement
4. **Prevent duplicates** → Code sạch, dễ maintain

### Quick Reference

```
┌─────────────────────────────────────────────────────────┐
│              AI AUTOMATION SUCCESS FORMULA              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  GOOD PLANNING                                          │
│    + CLEAR CONTEXT                                      │
│    + EXPLICIT CONSTRAINTS                               │
│    + ITERATIVE REFINEMENT                               │
│    ─────────────────────                                │
│    = HIGH-QUALITY AUTOMATION CODE                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
