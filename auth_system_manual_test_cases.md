# Auth System - Manual Test Cases

**Dự án:** Auth System  
**Modules:** Login, Register, Dashboard  
**Tổng số Test Cases:** 54  
**Ngày tạo:** 2026-01-26  
**Tác giả:** Senior QA Engineer

---

# MODULE 1: LOGIN PAGE (17 Test Cases)

## POSITIVE TEST CASES

---

## TC_LOGIN_001: Đăng nhập thành công với thông tin hợp lệ

**Requirement ID:** FR-LOGIN-002, FR-LOGIN-003, FR-LOGIN-004  
**Priority:** Critical  
**Test Type:** Positive

### Mô tả
Verify user có thể đăng nhập thành công khi nhập email và password hợp lệ

### Preconditions
1. Mở browser (Chrome/Firefox/Safari)
2. Truy cập trang Login: `login.html`
3. Đảm bảo localStorage đã được clear

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@example.com | Email đúng format |
| Password | password123 | 11 ký tự (> 6 chars) |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "user@example.com" vào field Email (id=`email`) | Email hiển thị trong field |
| 2 | Nhập "password123" vào field Password (id=`password`) | Password được mask (••••) |
| 3 | Click button "Đăng Nhập" (id=`loginBtn`) | Form được submit |
| 4 | Quan sát kết quả | Redirect đến dashboard.html |

### Expected Result
- Không có error message hiển thị
- localStorage chứa key `isLoggedIn` = "true"
- localStorage chứa key `userEmail` = "user@example.com"
- Trang chuyển sang dashboard.html
- Dashboard hiển thị email user

### Actual Result
[Để trống - QA điền khi thực hiện]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_002: Đăng nhập thành công với email có subdomain

**Requirement ID:** FR-LOGIN-002, FR-LOGIN-004  
**Priority:** High  
**Test Type:** Positive

### Mô tả
Verify hệ thống chấp nhận email có subdomain hợp lệ

### Preconditions
1. Mở browser và truy cập `login.html`
2. localStorage đã được clear

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@mail.company.com | Email với subdomain |
| Password | Test@123 | 8 ký tự hợp lệ |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "user@mail.company.com" vào field Email | Email hiển thị |
| 2 | Nhập "Test@123" vào field Password | Password được mask |
| 3 | Click button "Đăng Nhập" | Form submit thành công |

### Expected Result
- Login thành công
- Redirect đến dashboard.html
- localStorage được cập nhật đúng

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## NEGATIVE TEST CASES

---

## TC_LOGIN_003: Đăng nhập thất bại với Email trống

**Requirement ID:** FR-LOGIN-002  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống hiển thị error khi Email để trống

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | [trống] | Không nhập gì |
| Password | password123 | Hợp lệ |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Để trống field Email | Field trống |
| 2 | Nhập "password123" vào Password | Password hiển thị masked |
| 3 | Click button "Đăng Nhập" | Validation fail |

### Expected Result
- Error message hiển thị tại id=`emailError`
- Form group có class `.error`
- Form KHÔNG submit
- KHÔNG redirect

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_004: Đăng nhập thất bại với Password trống

**Requirement ID:** FR-LOGIN-003  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống hiển thị error khi Password để trống

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@example.com | Hợp lệ |
| Password | [trống] | Không nhập gì |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "user@example.com" vào Email | Email hiển thị |
| 2 | Để trống field Password | Field trống |
| 3 | Click button "Đăng Nhập" | Validation fail |

### Expected Result
- Error message hiển thị tại id=`passwordError`
- Form group có class `.error`
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_005: Đăng nhập thất bại với cả Email và Password trống

**Requirement ID:** FR-LOGIN-002, FR-LOGIN-003  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống hiển thị error cho cả 2 field khi đều trống

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | [trống] | Không nhập |
| Password | [trống] | Không nhập |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Để trống cả 2 field | Các field trống |
| 2 | Click button "Đăng Nhập" | Validation fail |

### Expected Result
- Error message hiển thị tại cả `emailError` và `passwordError`
- Cả 2 form group có class `.error`
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_006: Đăng nhập thất bại với Email sai format (thiếu @)

**Requirement ID:** FR-LOGIN-002  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối email không có ký tự @

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | userexample.com | Thiếu @ |
| Password | password123 | Hợp lệ |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "userexample.com" vào Email | Email hiển thị |
| 2 | Nhập password hợp lệ | Password masked |
| 3 | Click "Đăng Nhập" | Validation fail |

### Expected Result
- Error message về email format hiển thị
- Email field có error state
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_007: Đăng nhập thất bại với Email sai format (thiếu domain)

**Requirement ID:** FR-LOGIN-002  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối email không có domain (.xxx)

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@example | Thiếu .xxx |
| Password | password123 | Hợp lệ |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "user@example" vào Email | Email hiển thị |
| 2 | Nhập password hợp lệ | Password masked |
| 3 | Click "Đăng Nhập" | Validation fail |

### Expected Result
- Error về email format
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## BOUNDARY TEST CASES

---

## TC_LOGIN_008: Password với đúng 6 ký tự (Minimum Valid)

**Requirement ID:** FR-LOGIN-003  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống chấp nhận password có đúng 6 ký tự (lower boundary)

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@example.com | Hợp lệ |
| Password | 123456 | Đúng 6 ký tự |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập email hợp lệ | Email hiển thị |
| 2 | Nhập "123456" (6 chars) vào Password | Password masked |
| 3 | Click "Đăng Nhập" | Validation pass cho Password |

### Expected Result
- Password field KHÔNG có error
- Form có thể submit
- Login thành công (nếu credentials đúng)

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_009: Password với 5 ký tự (Minimum Invalid)

**Requirement ID:** FR-LOGIN-003  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống từ chối password có 5 ký tự (dưới minimum)

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@example.com | Hợp lệ |
| Password | 12345 | 5 ký tự (< 6) |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập email hợp lệ | Email hiển thị |
| 2 | Nhập "12345" (5 chars) vào Password | Password masked |
| 3 | Click "Đăng Nhập" | Validation fail |

### Expected Result
- Error message về password length hiển thị
- Password field có error state
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_010: Password với 7 ký tự (Above Minimum)

**Requirement ID:** FR-LOGIN-003  
**Priority:** Medium  
**Test Type:** Boundary

### Mô tả
Verify hệ thống chấp nhận password có 7 ký tự

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@example.com | Hợp lệ |
| Password | 1234567 | 7 ký tự |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập email và password theo test data | Fields được fill |
| 2 | Click "Đăng Nhập" | Validation pass |

### Expected Result
- Password validation pass
- Form có thể submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## UI/UX TEST CASES

---

## TC_LOGIN_011: Kiểm tra placeholder text hiển thị đúng

**Requirement ID:** FR-LOGIN-001  
**Priority:** Medium  
**Test Type:** UI

### Mô tả
Verify các placeholder text hiển thị đúng theo design

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
N/A

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Quan sát field Email | Placeholder = "Nhập email của bạn" |
| 2 | Quan sát field Password | Placeholder = "Nhập mật khẩu" |

### Expected Result
- Email field có placeholder "Nhập email của bạn"
- Password field có placeholder "Nhập mật khẩu"

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_012: Kiểm tra hover effect trên Login button

**Requirement ID:** FR-LOGIN-001  
**Priority:** Low  
**Test Type:** UI

### Mô tả
Verify button Login có hover effect

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Di chuột hover lên button "Đăng Nhập" | Button thay đổi style (màu sắc/shadow) |
| 2 | Di chuột ra khỏi button | Button trở về style ban đầu |

### Expected Result
- Hover state rõ ràng
- Transition smooth

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_013: Kiểm tra focus state trên input fields

**Requirement ID:** FR-LOGIN-001  
**Priority:** Medium  
**Test Type:** UI

### Mô tả
Verify input fields có focus state rõ ràng

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click vào field Email | Field có border/outline highlight |
| 2 | Tab sang field Password | Focus chuyển sang Password |
| 3 | Tab lần nữa | Focus chuyển sang Login button |

### Expected Result
- Focus state visible
- Tab order đúng: Email → Password → Login Button

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## SECURITY TEST CASES

---

## TC_LOGIN_014: Password được mask (hidden)

**Requirement ID:** FR-LOGIN-001  
**Priority:** Critical  
**Test Type:** Security

### Mô tả
Verify password không hiển thị dạng plain text

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "password123" vào Password field | Hiển thị dạng ••••••••••• |
| 2 | Inspect element Password field | type="password" |

### Expected Result
- Password hiển thị masked (dots/asterisks)
- Input type = "password"

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_015: XSS Injection trong Email field

**Requirement ID:** FR-LOGIN-002  
**Priority:** Critical  
**Test Type:** Security

### Mô tả
Verify hệ thống không execute script injection

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | `<script>alert('XSS')</script>` | XSS payload |
| Password | password123 | Valid |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập XSS payload vào Email | Text được nhập |
| 2 | Click "Đăng Nhập" | Form validation |

### Expected Result
- Script KHÔNG được execute
- Không có alert popup
- Email validation fail (format không hợp lệ)

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## NAVIGATION TEST CASES

---

## TC_LOGIN_016: Navigation từ Login sang Register

**Requirement ID:** FR-LOGIN-005  
**Priority:** High  
**Test Type:** Navigation

### Mô tả
Verify link "Đăng ký ngay" chuyển đến trang Register

### Preconditions
1. Mở browser và truy cập `login.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tìm link "Đăng ký ngay" | Link visible |
| 2 | Click link | Navigate to register.html |

### Expected Result
- URL chuyển sang register.html
- Trang Register hiển thị đầy đủ

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_LOGIN_017: Login thành công redirect đến Dashboard

**Requirement ID:** FR-LOGIN-004  
**Priority:** Critical  
**Test Type:** Navigation

### Mô tả
Verify sau khi login thành công, user được redirect đến Dashboard

### Preconditions
1. Mở browser và truy cập `login.html`
2. localStorage đã clear

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | user@example.com | Valid |
| Password | password123 | Valid |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập credentials hợp lệ | Fields filled |
| 2 | Click "Đăng Nhập" | Form submit |
| 3 | Quan sát URL | URL = dashboard.html |

### Expected Result
- Redirect thành công đến dashboard.html
- Dashboard page load đầy đủ

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---
# MODULE 2: REGISTER PAGE (26 Test Cases)

## POSITIVE TEST CASES

---

## TC_REG_001: Đăng ký thành công với tất cả thông tin hợp lệ

**Requirement ID:** FR-REG-001 đến FR-REG-007  
**Priority:** Critical  
**Test Type:** Positive

### Mô tả
Verify user có thể đăng ký thành công với tất cả thông tin hợp lệ

### Preconditions
1. Mở browser và truy cập `register.html`
2. Form đăng ký hiển thị đầy đủ các field

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | Nguyen Van A | 12 chars, valid |
| Username | testuser1234 | 12 chars (10-15 valid) |
| Email | test@example.com | Valid format |
| Password | Test@123456 | Đủ complexity |
| Confirm Password | Test@123456 | Match password |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "Nguyen Van A" vào Full Name (id=`fullname`) | Text hiển thị |
| 2 | Nhập "testuser1234" vào Username (id=`username`) | Text hiển thị |
| 3 | Nhập "test@example.com" vào Email (id=`email`) | Email hiển thị |
| 4 | Nhập "Test@123456" vào Password (id=`password`) | Password masked, tất cả requirements ✓ |
| 5 | Nhập "Test@123456" vào Confirm Password (id=`confirmPassword`) | Password masked |
| 6 | Click button "Đăng Ký" (id=`registerBtn`) | Form submit |

### Expected Result
- Tất cả password requirements hiển thị ✓
- Alert "Đăng ký thành công" xuất hiện
- Redirect về login.html

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_002: Đăng ký thành công với password phức tạp

**Requirement ID:** FR-REG-005, FR-REG-007  
**Priority:** High  
**Test Type:** Positive

### Mô tả
Verify đăng ký thành công với password đầy đủ complexity

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | Tran Thi B | Valid |
| Username | newuser12345 | 12 chars |
| Email | newuser@test.com | Valid |
| Password | Abc@1234! | uppercase + lowercase + number + special + 9 chars |
| Confirm Password | Abc@1234! | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Điền tất cả fields theo test data | Fields được fill |
| 2 | Quan sát password requirements | Tất cả 5 requirements ✓ |
| 3 | Click "Đăng Ký" | Đăng ký thành công |

### Expected Result
- Alert thành công
- Redirect login.html

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## NEGATIVE TEST CASES

---

## TC_REG_003: Đăng ký thất bại với Full Name trống

**Requirement ID:** FR-REG-002  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối khi Full Name để trống

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | [trống] | Không nhập |
| Username | testuser1234 | Valid |
| Email | test@example.com | Valid |
| Password | Test@123456 | Valid |
| Confirm Password | Test@123456 | Valid |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Để trống Full Name | Field trống |
| 2 | Điền các field khác hợp lệ | Fields filled |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error message cho Full Name hiển thị
- Form KHÔNG submit
- Không redirect

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_004: Đăng ký thất bại với Username trống

**Requirement ID:** FR-REG-003  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối khi Username để trống

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | Nguyen Van A | Valid |
| Username | [trống] | Không nhập |
| Email | test@example.com | Valid |
| Password | Test@123456 | Valid |
| Confirm Password | Test@123456 | Valid |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Điền Full Name hợp lệ | Text hiển thị |
| 2 | Để trống Username | Field trống |
| 3 | Điền các field khác | Fields filled |
| 4 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error message cho Username
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_005: Đăng ký thất bại với Username < 10 ký tự

**Requirement ID:** FR-REG-003  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối username dưới 10 ký tự

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | Nguyen Van A | Valid |
| Username | abcdefghi | 9 ký tự (< 10) |
| Email | test@example.com | Valid |
| Password | Test@123456 | Valid |
| Confirm Password | Test@123456 | Valid |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "abcdefghi" (9 chars) vào Username | Text hiển thị |
| 2 | Điền các field khác hợp lệ | Fields filled |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error "Username phải có độ dài từ 10-15 ký tự"
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_006: Đăng ký thất bại với Username > 15 ký tự

**Requirement ID:** FR-REG-003  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối username trên 15 ký tự

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Username | abcdefghijklmnop | 16 ký tự (> 15) |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "abcdefghijklmnop" (16 chars) vào Username | Text hiển thị |
| 2 | Điền các field khác hợp lệ | Fields filled |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error về username length
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_007: Đăng ký thất bại với Email sai format

**Requirement ID:** FR-REG-004  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối email không đúng format

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Email | invalid-email | Không có @ và domain |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "invalid-email" vào Email | Text hiển thị |
| 2 | Điền các field khác hợp lệ | Fields filled |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error về email format
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_008: Đăng ký thất bại với Password thiếu chữ IN HOA

**Requirement ID:** FR-REG-005  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối password không chứa chữ IN HOA

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Password | password1! | Thiếu uppercase |
| Confirm Password | password1! | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "password1!" vào Password | Password masked |
| 2 | Quan sát requirement "Ít nhất 1 chữ in hoa" | Hiển thị ○ (not checked) |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Requirement "Ít nhất 1 chữ in hoa (A-Z)" không có ✓
- id=`reqUppercase` không active
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_009: Đăng ký thất bại với Password thiếu chữ thường

**Requirement ID:** FR-REG-005  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối password không chứa chữ thường

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Password | PASSWORD1! | Thiếu lowercase |
| Confirm Password | PASSWORD1! | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "PASSWORD1!" vào Password | Password masked |
| 2 | Quan sát requirement "Ít nhất 1 chữ thường" | Hiển thị ○ |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- id=`reqLowercase` không active
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_010: Đăng ký thất bại với Password thiếu số

**Requirement ID:** FR-REG-005  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối password không chứa số

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Password | Password! | Thiếu number |
| Confirm Password | Password! | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "Password!" vào Password | Password masked |
| 2 | Quan sát requirement "Ít nhất 1 số" | Hiển thị ○ |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- id=`reqNumber` không active
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_011: Đăng ký thất bại với Password thiếu ký tự đặc biệt

**Requirement ID:** FR-REG-005  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối password không chứa ký tự đặc biệt

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Password | Password123 | Thiếu special char |
| Confirm Password | Password123 | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "Password123" vào Password | Password masked |
| 2 | Quan sát requirement "Ít nhất 1 ký tự đặc biệt" | Hiển thị ○ |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- id=`reqSpecial` không active
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_012: Đăng ký thất bại với Confirm Password không khớp

**Requirement ID:** FR-REG-006  
**Priority:** Critical  
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối khi confirm password không match

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Password | Test@123456 | Valid |
| Confirm Password | Test@123457 | Khác 1 ký tự cuối |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "Test@123456" vào Password | Password masked |
| 2 | Nhập "Test@123457" vào Confirm Password | Password masked |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error "Mật khẩu xác nhận không khớp"
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## BOUNDARY TEST CASES

---

## TC_REG_013: Username với đúng 10 ký tự (Minimum Valid)

**Requirement ID:** FR-REG-003  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống chấp nhận username có đúng 10 ký tự (lower boundary)

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Username | abcdefghij | Đúng 10 ký tự |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "abcdefghij" (10 chars) vào Username | Username được nhập |
| 2 | Nhập các field khác với giá trị valid | Các field được fill |
| 3 | Click "Đăng Ký" | Validation pass cho Username |

### Expected Result
- Username field KHÔNG có error state
- Có thể submit form

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_014: Username với 9 ký tự (Minimum Invalid)

**Requirement ID:** FR-REG-003  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống từ chối username có 9 ký tự

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Username | abcdefghi | 9 ký tự (< 10) |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "abcdefghi" (9 chars) vào Username | Text hiển thị |
| 2 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error message về username length
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_015: Username với đúng 15 ký tự (Maximum Valid)

**Requirement ID:** FR-REG-003  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống chấp nhận username có đúng 15 ký tự (upper boundary)

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Username | abcdefghijklmno | Đúng 15 ký tự |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "abcdefghijklmno" (15 chars) vào Username | Text hiển thị |
| 2 | Điền các field khác valid | Fields filled |
| 3 | Click "Đăng Ký" | Validation pass |

### Expected Result
- Username validation pass
- Form có thể submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_016: Username với 16 ký tự (Maximum Invalid)

**Requirement ID:** FR-REG-003  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống từ chối username có 16 ký tự

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Username | abcdefghijklmnop | 16 ký tự (> 15) |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "abcdefghijklmnop" (16 chars) vào Username | Text hiển thị |
| 2 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error về username length
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_017: Password với đúng 8 ký tự (Minimum Valid)

**Requirement ID:** FR-REG-005  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống chấp nhận password có đúng 8 ký tự với đủ complexity

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Password | Test@12A | 8 chars, đủ complexity |
| Confirm Password | Test@12A | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "Test@12A" (8 chars) vào Password | Password masked |
| 2 | Quan sát requirements | Tất cả ✓ |
| 3 | Click "Đăng Ký" | Validation pass |

### Expected Result
- id=`reqLength` active (✓)
- Password validation pass

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_018: Password với 7 ký tự (Minimum Invalid)

**Requirement ID:** FR-REG-005  
**Priority:** High  
**Test Type:** Boundary

### Mô tả
Verify hệ thống từ chối password có 7 ký tự

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Password | Test@1A | 7 chars (< 8) |
| Confirm Password | Test@1A | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "Test@1A" (7 chars) vào Password | Password masked |
| 2 | Quan sát requirements | "Ít nhất 8 ký tự" hiển thị ○ |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- id=`reqLength` không active
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## UI/UX TEST CASES

---

## TC_REG_019: Kiểm tra Password Requirements hiển thị real-time

**Requirement ID:** FR-REG-005  
**Priority:** High  
**Test Type:** UI

### Mô tả
Verify password requirements update real-time khi user nhập password

### Preconditions
1. Mở browser và truy cập `register.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Focus vào field Password | Requirements list hiển thị |
| 2 | Nhập "a" | reqLowercase ✓, others ○ |
| 3 | Nhập thêm "A" → "aA" | reqUppercase ✓ |
| 4 | Nhập thêm "1" → "aA1" | reqNumber ✓ |
| 5 | Nhập thêm "@" → "aA1@" | reqSpecial ✓ |
| 6 | Nhập thêm "bcde" → "aA1@bcde" | reqLength ✓ (8 chars) |

### Expected Result
- Requirements update ngay khi user nhập
- ✓ hiển thị khi satisfy, ○ khi chưa

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_020: Kiểm tra responsive design trên mobile (< 768px)

**Requirement ID:** FR-REG-001  
**Priority:** Medium  
**Test Type:** UI

### Mô tả
Verify form register hiển thị đúng trên mobile viewport

### Preconditions
1. Mở browser
2. Set viewport width < 768px hoặc dùng DevTools mobile view

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Resize browser < 768px | Layout responsive |
| 2 | Quan sát form | Form chiếm full width |
| 3 | Kiểm tra các fields | Input fields đầy đủ, không bị cắt |
| 4 | Kiểm tra button | Button accessible |

### Expected Result
- Form hiển thị đúng trên mobile
- Không có horizontal scroll
- Tất cả elements accessible

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_021: Kiểm tra error state hiển thị đúng vị trí

**Requirement ID:** FR-REG-001  
**Priority:** Medium  
**Test Type:** UI

### Mô tả
Verify error messages hiển thị đúng vị trí dưới mỗi field

### Preconditions
1. Mở browser và truy cập `register.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Submit form với tất cả fields trống | Multiple errors |
| 2 | Quan sát vị trí errors | Errors nằm ngay dưới field tương ứng |

### Expected Result
- Mỗi error message nằm trực tiếp dưới field có lỗi
- Không overlap với fields khác

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_022: Kiểm tra Full Name với 1 ký tự (Invalid)

**Requirement ID:** FR-REG-002  
**Priority:** Medium  
**Test Type:** Boundary

### Mô tả
Verify hệ thống từ chối Full Name chỉ có 1 ký tự

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | A | 1 ký tự (< 2) |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "A" vào Full Name | Text hiển thị |
| 2 | Điền các field khác valid | Fields filled |
| 3 | Click "Đăng Ký" | Validation fail |

### Expected Result
- Error về Full Name length
- Form KHÔNG submit

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## SECURITY TEST CASES

---

## TC_REG_023: Password được mask (hidden)

**Requirement ID:** FR-REG-001  
**Priority:** Critical  
**Test Type:** Security

### Mô tả
Verify password và confirm password không hiển thị plain text

### Preconditions
1. Mở browser và truy cập `register.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập "Test@123" vào Password | Hiển thị masked |
| 2 | Nhập "Test@123" vào Confirm Password | Hiển thị masked |
| 3 | Inspect elements | type="password" cho cả 2 |

### Expected Result
- Cả 2 fields hiển thị masked
- Input type = "password"

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_024: XSS Injection trong Username field

**Requirement ID:** FR-REG-003  
**Priority:** Critical  
**Test Type:** Security

### Mô tả
Verify hệ thống không execute script trong username

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Username | `<script>alert(1)</script>` | XSS payload |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập XSS payload vào Username | Text được nhập |
| 2 | Submit form | No script execution |

### Expected Result
- Script KHÔNG execute
- Username validation fail (length/format)
- Không có alert popup

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## NAVIGATION TEST CASES

---

## TC_REG_025: Navigation từ Register sang Login

**Requirement ID:** FR-REG-007  
**Priority:** High  
**Test Type:** Navigation

### Mô tả
Verify link quay về Login hoạt động

### Preconditions
1. Mở browser và truy cập `register.html`

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tìm link "Đăng nhập" hoặc tương tự | Link visible |
| 2 | Click link | Navigate to login.html |

### Expected Result
- URL chuyển sang login.html
- Trang Login hiển thị

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_REG_026: Đăng ký thành công redirect về Login

**Requirement ID:** FR-REG-007  
**Priority:** Critical  
**Test Type:** Navigation

### Mô tả
Verify sau khi đăng ký thành công, redirect về Login page

### Preconditions
1. Mở browser và truy cập `register.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | Nguyen Van Test | Valid |
| Username | testuser12345 | 13 chars (valid) |
| Email | test@example.com | Valid |
| Password | Test@123456 | Valid complexity |
| Confirm Password | Test@123456 | Match |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Điền tất cả fields valid | All fields filled |
| 2 | Click "Đăng Ký" | Form submit |
| 3 | Chấp nhận alert (nếu có) | Alert dismissed |
| 4 | Quan sát URL | URL = login.html |

### Expected Result
- Alert "Đăng ký thành công" xuất hiện
- Sau alert, redirect về login.html
- Login page load đầy đủ

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---
# MODULE 3: DASHBOARD PAGE (11 Test Cases)

## POSITIVE TEST CASES

---

## TC_DASH_001: Dashboard hiển thị đầy đủ thông tin user từ localStorage

**Requirement ID:** FR-DASH-001, FR-DASH-005  
**Priority:** Critical  
**Test Type:** Positive

### Mô tả
Verify Dashboard load và hiển thị đúng thông tin user từ localStorage

### Preconditions
1. User đã login thành công
2. localStorage có chứa: `isLoggedIn`, `userEmail`, `userName`
3. Mở browser và truy cập `dashboard.html`

### Test Data
| localStorage Key | Value | Ghi chú |
|------------------|-------|---------|
| isLoggedIn | true | Đã login |
| userEmail | user@example.com | Email user |
| userName | Nguyen Van A | Tên user |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set localStorage với test data | Data được lưu |
| 2 | Truy cập dashboard.html | Page load |
| 3 | Quan sát id=`userName` | Hiển thị "Nguyen Van A" |
| 4 | Quan sát id=`userEmail` | Hiển thị "user@example.com" |
| 5 | Quan sát id=`userAvatar` | Avatar hiển thị |

### Expected Result
- Tên user hiển thị đúng
- Email user hiển thị đúng
- Avatar visible

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_DASH_002: Dashboard hiển thị đầy đủ Statistics Cards

**Requirement ID:** FR-DASH-003  
**Priority:** High  
**Test Type:** Positive

### Mô tả
Verify Dashboard hiển thị đầy đủ 4 statistics cards với values

### Preconditions
1. User đã login thành công
2. Truy cập dashboard.html

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Quan sát id=`statUsers` | Card Users hiển thị với value |
| 2 | Quan sát id=`statRevenue` | Card Revenue hiển thị với value |
| 3 | Quan sát id=`statOrders` | Card Orders hiển thị với value |
| 4 | Quan sát id=`statGrowth` | Card Growth hiển thị với value |

### Expected Result
- Tất cả 4 statistics cards hiển thị
- Mỗi card có giá trị số

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_DASH_003: Dashboard hiển thị Activity Table với 5 rows

**Requirement ID:** FR-DASH-004  
**Priority:** High  
**Test Type:** Positive

### Mô tả
Verify Activity Table hiển thị đúng 5 rows với status badges

### Preconditions
1. User đã login
2. Truy cập dashboard.html

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tìm id=`activityTable` | Table visible |
| 2 | Đếm số rows trong table | 5 rows |
| 3 | Kiểm tra status badges | Mỗi row có status badge |

### Expected Result
- Table hiển thị với id=`activityTable`
- Có đúng 5 data rows
- Status badges hiển thị với màu sắc phù hợp

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## NEGATIVE TEST CASES

---

## TC_DASH_004: Redirect về Login khi chưa đăng nhập

**Requirement ID:** FR-DASH-005  
**Priority:** Critical  
**Test Type:** Negative

### Mô tả
Verify user chưa login sẽ bị redirect về trang Login

### Preconditions
1. localStorage đã clear hoặc không có `isLoggedIn`
2. Mở browser

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Clear localStorage | localStorage empty |
| 2 | Truy cập trực tiếp dashboard.html | Attempt to access |
| 3 | Quan sát kết quả | Redirect về login.html |

### Expected Result
- User KHÔNG thể truy cập Dashboard
- Automatic redirect về login.html
- Login page hiển thị

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_DASH_005: Dashboard không hiển thị khi isLoggedIn = false

**Requirement ID:** FR-DASH-005  
**Priority:** High  
**Test Type:** Negative

### Mô tả
Verify Dashboard từ chối access khi isLoggedIn không phải "true"

### Preconditions
1. Mở browser

### Test Data
| localStorage Key | Value | Ghi chú |
|------------------|-------|---------|
| isLoggedIn | false | Không login |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set localStorage isLoggedIn = "false" | Data set |
| 2 | Truy cập dashboard.html | Attempt access |
| 3 | Quan sát kết quả | Redirect về login |

### Expected Result
- Redirect về login.html
- Dashboard content không hiển thị

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## UI/UX TEST CASES

---

## TC_DASH_006: Sidebar Navigation menu items hoạt động

**Requirement ID:** FR-DASH-002  
**Priority:** High  
**Test Type:** UI

### Mô tả
Verify 4 menu items trong sidebar có thể click và active

### Preconditions
1. User đã login
2. Truy cập dashboard.html

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click id=`navDashboard` | Item active/highlighted |
| 2 | Click id=`navAnalytics` | Analytics active, Dashboard deactive |
| 3 | Click id=`navProjects` | Projects active |
| 4 | Click id=`navSettings` | Settings active |

### Expected Result
- Mỗi menu item có thể click
- Active state hiển thị rõ ràng
- Chỉ 1 item active tại 1 thời điểm

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_DASH_007: Kiểm tra responsive design Dashboard

**Requirement ID:** FR-DASH-001  
**Priority:** Medium  
**Test Type:** UI

### Mô tả
Verify Dashboard layout responsive trên các viewport khác nhau

### Preconditions
1. User đã login
2. Truy cập dashboard.html

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View trên Desktop (> 1024px) | Full sidebar + main content |
| 2 | Resize to Tablet (768px - 1024px) | Layout adapts |
| 3 | Resize to Mobile (< 768px) | Sidebar collapsed/hamburger menu |

### Expected Result
- Layout responsive ở các breakpoints
- Content không bị cắt hoặc overlap
- Navigation vẫn accessible trên mobile

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_DASH_008: Statistics Cards có hover effect

**Requirement ID:** FR-DASH-003  
**Priority:** Low  
**Test Type:** UI

### Mô tả
Verify statistics cards có visual feedback khi hover

### Preconditions
1. User đã login
2. Truy cập dashboard.html

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Hover lên statUsers card | Card có shadow/scale effect |
| 2 | Hover lên statRevenue card | Similar effect |
| 3 | Move cursor away | Cards return to normal state |

### Expected Result
- Hover effect visible
- Transition smooth
- Consistent across all cards

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## SECURITY TEST CASES

---

## TC_DASH_009: LocalStorage data handling security

**Requirement ID:** FR-DASH-005  
**Priority:** High  
**Test Type:** Security

### Mô tả
Verify Dashboard xử lý localStorage data an toàn

### Preconditions
1. Mở browser

### Test Data
| localStorage Key | Value | Ghi chú |
|------------------|-------|---------|
| isLoggedIn | true | Valid |
| userEmail | `<script>alert('XSS')</script>` | XSS payload |
| userName | `<img onerror=alert(1) src=x>` | XSS payload |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set localStorage với XSS payloads | Data set |
| 2 | Truy cập dashboard.html | Page load |
| 3 | Quan sát kết quả | Không có script execution |

### Expected Result
- Scripts KHÔNG execute
- Content được escape/sanitize
- Page vẫn hoạt động bình thường

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## NAVIGATION TEST CASES

---

## TC_DASH_010: Logout xóa localStorage và redirect về Login

**Requirement ID:** FR-DASH-006  
**Priority:** Critical  
**Test Type:** Navigation

### Mô tả
Verify Logout button xóa session và redirect về Login

### Preconditions
1. User đã login thành công
2. Truy cập dashboard.html
3. localStorage có user data

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Xác nhận đang ở Dashboard | Dashboard visible |
| 2 | Click id=`logoutBtn` | Logout action triggered |
| 3 | Kiểm tra localStorage | localStorage cleared |
| 4 | Quan sát URL | Redirect về login.html |

### Expected Result
- localStorage.isLoggedIn bị xóa hoặc = "false"
- User data cleared
- Redirect về login.html
- Login page hiển thị

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

## TC_DASH_011: Sau Logout không thể Back về Dashboard

**Requirement ID:** FR-DASH-006  
**Priority:** High  
**Test Type:** Navigation

### Mô tả
Verify sau khi logout, user không thể dùng browser back để truy cập Dashboard

### Preconditions
1. User đã login và đang ở Dashboard
2. User click Logout

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Từ Dashboard, click Logout | Redirect về Login |
| 2 | Click browser Back button | Attempt to go back |
| 3 | Quan sát kết quả | Redirect lại về Login |

### Expected Result
- Browser back không cho phép truy cập Dashboard
- Luôn redirect về Login nếu không có valid session
- localStorage không có isLoggedIn = "true"

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

---

# TEST SUMMARY

## Tổng hợp Test Cases

| Module | Positive | Negative | Boundary | UI/UX | Security | Navigation | Total |
|--------|----------|----------|----------|-------|----------|------------|-------|
| Login | 2 | 5 | 3 | 3 | 2 | 2 | **17** |
| Register | 2 | 10 | 6 | 4 | 2 | 2 | **26** |
| Dashboard | 3 | 2 | 0 | 3 | 1 | 2 | **11** |
| **TOTAL** | **7** | **17** | **9** | **10** | **5** | **6** | **54** |

## Requirement Traceability Matrix

| Requirement ID | Test Cases Covering |
|----------------|---------------------|
| FR-LOGIN-001 | TC_LOGIN_011, TC_LOGIN_012, TC_LOGIN_013, TC_LOGIN_014 |
| FR-LOGIN-002 | TC_LOGIN_001, TC_LOGIN_002, TC_LOGIN_003, TC_LOGIN_005, TC_LOGIN_006, TC_LOGIN_007, TC_LOGIN_015 |
| FR-LOGIN-003 | TC_LOGIN_001, TC_LOGIN_004, TC_LOGIN_005, TC_LOGIN_008, TC_LOGIN_009, TC_LOGIN_010 |
| FR-LOGIN-004 | TC_LOGIN_001, TC_LOGIN_002, TC_LOGIN_017 |
| FR-LOGIN-005 | TC_LOGIN_016 |
| FR-REG-001 | TC_REG_001, TC_REG_020, TC_REG_021, TC_REG_023 |
| FR-REG-002 | TC_REG_001, TC_REG_003, TC_REG_022 |
| FR-REG-003 | TC_REG_001, TC_REG_004, TC_REG_005, TC_REG_006, TC_REG_013, TC_REG_014, TC_REG_015, TC_REG_016, TC_REG_024 |
| FR-REG-004 | TC_REG_001, TC_REG_007 |
| FR-REG-005 | TC_REG_001, TC_REG_002, TC_REG_008, TC_REG_009, TC_REG_010, TC_REG_011, TC_REG_017, TC_REG_018, TC_REG_019 |
| FR-REG-006 | TC_REG_001, TC_REG_012 |
| FR-REG-007 | TC_REG_001, TC_REG_002, TC_REG_025, TC_REG_026 |
| FR-DASH-001 | TC_DASH_001, TC_DASH_007 |
| FR-DASH-002 | TC_DASH_006 |
| FR-DASH-003 | TC_DASH_002, TC_DASH_008 |
| FR-DASH-004 | TC_DASH_003 |
| FR-DASH-005 | TC_DASH_001, TC_DASH_004, TC_DASH_005, TC_DASH_009 |
| FR-DASH-006 | TC_DASH_010, TC_DASH_011 |

---

**Ngày hoàn thành:** 2026-01-26  
**Reviewed by:** [Tên QA Lead]  
**Approved by:** [Tên PM/PO]
