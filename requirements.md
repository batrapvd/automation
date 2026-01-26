# Software Requirements Specification (SRS)
# Hệ thống Đăng nhập/Đăng ký/Dashboard

**Version:** 1.0  
**Ngày tạo:** 2026-01-26  
**Dự án:** Auth System

---

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Yêu cầu chức năng](#2-yêu-cầu-chức-năng)
3. [Yêu cầu phi chức năng](#3-yêu-cầu-phi-chức-năng)
4. [Traceability Matrix](#4-traceability-matrix)

---

## 1. Giới thiệu

### 1.1 Mục đích
Tài liệu này mô tả các yêu cầu chi tiết cho hệ thống Authentication gồm 3 modules: Login, Register, và Dashboard.

### 1.2 Phạm vi
- **Login Module:** Xác thực người dùng
- **Register Module:** Đăng ký tài khoản mới
- **Dashboard Module:** Hiển thị thông tin sau khi đăng nhập

### 1.3 Định nghĩa và viết tắt
| Thuật ngữ | Định nghĩa |
|-----------|------------|
| REQ | Requirement (Yêu cầu) |
| FR | Functional Requirement (Yêu cầu chức năng) |
| NFR | Non-Functional Requirement (Yêu cầu phi chức năng) |

---

## 2. Yêu cầu chức năng

### 2.1 Module: Login Page

#### FR-LOGIN-001: Hiển thị giao diện Login
**Mô tả:** Hệ thống phải hiển thị form đăng nhập với đầy đủ các trường.

**Acceptance Criteria:**
- [ ] Hiển thị input field cho Email (id: `email`)
- [ ] Hiển thị input field cho Password (id: `password`)
- [ ] Hiển thị button Đăng nhập (id: `loginBtn`)
- [ ] Hiển thị link dẫn đến trang Đăng ký

**UI Elements:**
| Element | Type | ID/Selector | Placeholder |
|---------|------|-------------|-------------|
| Email Input | input[type="email"] | `email` | "Nhập email của bạn" |
| Password Input | input[type="password"] | `password` | "Nhập mật khẩu" |
| Login Button | button[type="submit"] | `loginBtn` | - |
| Register Link | anchor | `a[href="register.html"]` | - |

---

#### FR-LOGIN-002: Validate Email
**Mô tả:** Hệ thống phải validate định dạng email.

**Acceptance Criteria:**
- [ ] Email là trường bắt buộc
- [ ] Email phải đúng format: `xxx@xxx.xxx`
- [ ] Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- [ ] Hiển thị lỗi nếu email không hợp lệ

**Error Display:**
- Error Message ID: `emailError`
- Error Text: "Vui lòng nhập email hợp lệ"
- Error Class: `.form-group.error`

---

#### FR-LOGIN-003: Validate Password
**Mô tả:** Hệ thống phải validate mật khẩu.

**Acceptance Criteria:**
- [ ] Password là trường bắt buộc
- [ ] Password phải có ít nhất 6 ký tự
- [ ] Hiển thị lỗi nếu password không đủ độ dài

**Error Display:**
- Error Message ID: `passwordError`
- Error Text: "Mật khẩu phải có ít nhất 6 ký tự"
- Error Class: `.form-group.error`

---

#### FR-LOGIN-004: Submit Form Login
**Mô tả:** Khi nhấn nút Đăng nhập với thông tin hợp lệ.

**Acceptance Criteria:**
- [ ] Lưu email vào localStorage với key `userEmail`
- [ ] Lưu trạng thái đăng nhập với key `isLoggedIn` = "true"
- [ ] Redirect đến trang Dashboard (`dashboard.html`)

---

#### FR-LOGIN-005: Navigation đến Register
**Mô tả:** Cho phép điều hướng đến trang đăng ký.

**Acceptance Criteria:**
- [ ] Click link "Đăng ký ngay" chuyển đến `register.html`

---

### 2.2 Module: Register Page

#### FR-REG-001: Hiển thị giao diện Register
**Mô tả:** Hệ thống phải hiển thị form đăng ký với đầy đủ các trường.

**UI Elements:**
| Element | Type | ID | Placeholder |
|---------|------|-----|-------------|
| Full Name Input | input[type="text"] | `fullname` | "Nhập họ và tên" |
| Username Input | input[type="text"] | `username` | "Nhập username (10-15 ký tự)" |
| Email Input | input[type="email"] | `email` | "Nhập email (vd: user@domain.com)" |
| Password Input | input[type="password"] | `password` | "Tạo mật khẩu phức tạp" |
| Confirm Password | input[type="password"] | `confirmPassword` | "Nhập lại mật khẩu" |
| Register Button | button[type="submit"] | `registerBtn` | - |
| Login Link | anchor | `a[href="login.html"]` | - |

---

#### FR-REG-002: Validate Full Name
**Mô tả:** Validate họ và tên người dùng.

**Acceptance Criteria:**
- [ ] Fullname là trường bắt buộc
- [ ] Fullname phải có ít nhất 2 ký tự

**Error Display:**
- Error Message ID: `fullnameError`
- Error Text: "Họ tên phải có ít nhất 2 ký tự"

---

#### FR-REG-003: Validate Username
**Mô tả:** Validate tên đăng nhập.

**Acceptance Criteria:**
- [ ] Username là trường bắt buộc
- [ ] Username phải có độ dài từ 10 đến 15 ký tự
- [ ] Không chấp nhận username < 10 ký tự
- [ ] Không chấp nhận username > 15 ký tự

**Boundary Values:**
| Condition | Value | Expected |
|-----------|-------|----------|
| Below minimum | 9 chars | Invalid ❌ |
| At minimum | 10 chars | Valid ✅ |
| In range | 12 chars | Valid ✅ |
| At maximum | 15 chars | Valid ✅ |
| Above maximum | 16 chars | Invalid ❌ |

**Error Display:**
- Error Message ID: `usernameError`
- Error Text: "Username phải có độ dài từ 10-15 ký tự"

---

#### FR-REG-004: Validate Email
**Mô tả:** Validate định dạng email với format nghiêm ngặt.

**Acceptance Criteria:**
- [ ] Email là trường bắt buộc
- [ ] Email phải đúng format nghiêm ngặt
- [ ] Regex: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`

**Valid Examples:**
- `user@example.com` ✅
- `user.name@domain.com` ✅
- `user+tag@example.com` ✅

**Invalid Examples:**
- `user@` ❌
- `@domain.com` ❌
- `user@domain` ❌
- `user.domain.com` ❌

**Error Display:**
- Error Message ID: `emailError`
- Error Text: "Email không đúng định dạng (vd: user@domain.com)"

---

#### FR-REG-005: Validate Password Complexity
**Mô tả:** Hệ thống phải kiểm tra độ phức tạp của mật khẩu.

**Acceptance Criteria - Password phải có:**
| Yêu cầu | Validation Rule | Element ID |
|---------|-----------------|------------|
| Độ dài | Ít nhất 8 ký tự | `reqLength` |
| Chữ hoa | Ít nhất 1 ký tự A-Z | `reqUppercase` |
| Chữ thường | Ít nhất 1 ký tự a-z | `reqLowercase` |
| Số | Ít nhất 1 ký tự 0-9 | `reqNumber` |
| Ký tự đặc biệt | Ít nhất 1 trong: !@#$%^&* | `reqSpecial` |

**Validation Regex:**
```javascript
length: (pwd) => pwd.length >= 8
uppercase: (pwd) => /[A-Z]/.test(pwd)
lowercase: (pwd) => /[a-z]/.test(pwd)
number: (pwd) => /[0-9]/.test(pwd)
special: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
```

**Real-time Feedback:**
- [ ] Hiển thị checklist các yêu cầu password
- [ ] Đánh dấu ✓ màu xanh khi yêu cầu được đáp ứng
- [ ] Hiển thị ○ khi yêu cầu chưa được đáp ứng

**Valid Password Examples:**
- `Password1!` ✅
- `Abc@1234` ✅
- `MyP@ss123` ✅

**Invalid Password Examples:**
- `password` ❌ (thiếu uppercase, number, special)
- `PASSWORD` ❌ (thiếu lowercase, number, special)
- `Pass123` ❌ (thiếu special, chỉ 7 chars)
- `password1!` ❌ (thiếu uppercase)

---

#### FR-REG-006: Validate Confirm Password
**Mô tả:** Xác nhận mật khẩu phải khớp với mật khẩu đã nhập.

**Acceptance Criteria:**
- [ ] Confirm password là trường bắt buộc
- [ ] Confirm password phải giống hệt password
- [ ] So sánh case-sensitive

**Error Display:**
- Error Message ID: `confirmPasswordError`
- Error Text: "Mật khẩu xác nhận không khớp"

---

#### FR-REG-007: Submit Form Register
**Mô tả:** Xử lý khi submit form đăng ký thành công.

**Acceptance Criteria:**
- [ ] Validate tất cả các trường trước khi submit
- [ ] Nếu có lỗi, không submit và hiển thị lỗi
- [ ] Nếu thành công, hiển thị alert "Đăng ký thành công! Vui lòng đăng nhập."
- [ ] Redirect về trang Login (`login.html`)

---

### 2.3 Module: Dashboard Page

#### FR-DASH-001: Hiển thị giao diện Dashboard
**Mô tả:** Hệ thống phải hiển thị dashboard với đầy đủ components.

**UI Elements:**
| Component | Element ID | Description |
|-----------|------------|-------------|
| User Name | `userName` | Hiển thị tên user (phần trước @) |
| User Email | `userEmail` | Hiển thị email từ localStorage |
| User Avatar | `userAvatar` | Hiển thị chữ cái đầu của email |
| Logout Button | `logoutBtn` | Nút đăng xuất |

---

#### FR-DASH-002: Sidebar Navigation
**Mô tả:** Hiển thị menu điều hướng bên trái.

**Navigation Items:**
| Menu Item | Element ID | Icon |
|-----------|------------|------|
| Tổng quan | `navDashboard` | 📊 |
| Phân tích | `navAnalytics` | 📈 |
| Dự án | `navProjects` | 📁 |
| Cài đặt | `navSettings` | ⚙️ |

**Acceptance Criteria:**
- [ ] Mặc định active là "Tổng quan"
- [ ] Click menu item sẽ set active class cho item đó
- [ ] Chỉ 1 item được active tại 1 thời điểm

---

#### FR-DASH-003: Statistics Cards
**Mô tả:** Hiển thị các thẻ thống kê.

**Stats Cards:**
| Card | Element ID | Value | Label |
|------|------------|-------|-------|
| Users | `statUsers` | 1,234 | Tổng người dùng |
| Revenue | `statRevenue` | $45,678 | Doanh thu |
| Orders | `statOrders` | 892 | Đơn hàng |
| Growth | `statGrowth` | +23% | Tăng trưởng |

---

#### FR-DASH-004: Activity Table
**Mô tả:** Hiển thị bảng hoạt động gần đây.

**Table Structure:**
| Column | Description |
|--------|-------------|
| ID | Mã hoạt động (#001, #002...) |
| Hoạt động | Mô tả hoạt động |
| Người thực hiện | Email người thực hiện |
| Thời gian | Thời gian thực hiện |
| Trạng thái | Badge: success/pending/error |

**Status Badges:**
| Status | Class | Color |
|--------|-------|-------|
| Thành công | `.status-badge.success` | Green |
| Đang xử lý | `.status-badge.pending` | Orange |
| Thất bại | `.status-badge.error` | Red |

---

#### FR-DASH-005: Load User Info
**Mô tả:** Tự động load thông tin user khi trang load.

**Acceptance Criteria:**
- [ ] Đọc email từ `localStorage.getItem('userEmail')`
- [ ] Nếu không có, hiển thị default: "user@example.com"
- [ ] Hiển thị username = phần trước @ của email
- [ ] Avatar = chữ cái đầu viết hoa

---

#### FR-DASH-006: Logout Functionality
**Mô tả:** Xử lý đăng xuất.

**Acceptance Criteria:**
- [ ] Click nút Logout (id: `logoutBtn`)
- [ ] Xóa `localStorage.isLoggedIn`
- [ ] Xóa `localStorage.userEmail`
- [ ] Redirect về trang Login (`login.html`)

---

## 3. Yêu cầu phi chức năng

### NFR-001: Responsive Design
**Mô tả:** Giao diện phải responsive trên mọi thiết bị.

**Breakpoints:**
| Device | Width | Behavior |
|--------|-------|----------|
| Mobile | < 768px | Single column, collapsible sidebar |
| Tablet | 768px - 1024px | Adjusted layout |
| Desktop | > 1024px | Full layout |

---

### NFR-002: UI/UX Standards
**Mô tả:** Giao diện phải đẹp và modern.

**Requirements:**
- [ ] Sử dụng Google Font: Inter
- [ ] Dark theme với gradient background
- [ ] Glassmorphism effect cho cards
- [ ] Hover effects cho buttons
- [ ] Focus states cho input fields
- [ ] Smooth transitions (0.3s ease)

---

### NFR-003: Security
**Mô tả:** Đảm bảo các tiêu chuẩn bảo mật cơ bản.

**Requirements:**
- [ ] Password field type="password" (masked input)
- [ ] Không lưu password trong localStorage
- [ ] Autocomplete attributes đúng chuẩn

---

### NFR-004: Accessibility
**Mô tả:** Đảm bảo accessibility cơ bản.

**Requirements:**
- [ ] Tất cả input có label
- [ ] Tab order logic
- [ ] Focus visible indicators
- [ ] Error messages accessible

---

## 4. Traceability Matrix

| Requirement ID | Test Case Category | Priority |
|----------------|-------------------|----------|
| FR-LOGIN-001 | UI/Visual | High |
| FR-LOGIN-002 | Validation | High |
| FR-LOGIN-003 | Validation | High |
| FR-LOGIN-004 | Functional | High |
| FR-LOGIN-005 | Navigation | Medium |
| FR-REG-001 | UI/Visual | High |
| FR-REG-002 | Validation | Medium |
| FR-REG-003 | Validation | High |
| FR-REG-004 | Validation | High |
| FR-REG-005 | Validation | High |
| FR-REG-006 | Validation | High |
| FR-REG-007 | Functional | High |
| FR-DASH-001 | UI/Visual | High |
| FR-DASH-002 | Functional | Medium |
| FR-DASH-003 | UI/Visual | Medium |
| FR-DASH-004 | UI/Visual | Medium |
| FR-DASH-005 | Functional | High |
| FR-DASH-006 | Functional | High |
| NFR-001 | Responsive | High |
| NFR-002 | UI/UX | Medium |
| NFR-003 | Security | High |
| NFR-004 | Accessibility | Medium |

---

## Cách sử dụng với Test Case Prompt

Sử dụng file này kết hợp với `prompt_test_cases.md`:

1. Copy nội dung requirement cần test
2. Paste vào AI prompt
3. Yêu cầu AI:

```
Dựa vào requirement sau, hãy generate test cases theo format trong prompt_test_cases.md:

[Paste requirement content]
```

AI sẽ tạo test cases với đầy đủ:
- Preconditions
- Test steps  
- Test data
- Expected results
- Priority và Type
