# PROMPT: Generate Manual Test Cases từ Requirements

## Vai trò
Bạn là một Senior QA Engineer với hơn 10 năm kinh nghiệm trong việc thiết kế và viết test cases. Hãy tạo bộ manual test cases chi tiết và chuyên nghiệp dựa trên tài liệu Requirements được cung cấp.

---

## Tài liệu Requirements

### Thông tin dự án
- **Tên dự án:** Auth System
- **Modules:** Login, Register, Dashboard
- **Loại test:** Manual Testing

---

### Module 1: LOGIN PAGE

#### Yêu cầu chức năng:

| Req ID | Yêu cầu | Chi tiết |
|--------|---------|----------|
| FR-LOGIN-001 | Hiển thị giao diện | Form với Email, Password, Login button, Register link |
| FR-LOGIN-002 | Validate Email | Required, format: xxx@xxx.xxx, Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| FR-LOGIN-003 | Validate Password | Required, min 6 ký tự |
| FR-LOGIN-004 | Submit thành công | Lưu localStorage, redirect dashboard.html |
| FR-LOGIN-005 | Navigation | Click "Đăng ký ngay" → register.html |

**UI Elements:**
- Email Input: id=`email`, placeholder="Nhập email của bạn"
- Password Input: id=`password`, placeholder="Nhập mật khẩu"
- Login Button: id=`loginBtn`
- Error Messages: id=`emailError`, `passwordError`
- Error Class: `.form-group.error`

---

### Module 2: REGISTER PAGE

#### Yêu cầu chức năng:

| Req ID | Yêu cầu | Chi tiết |
|--------|---------|----------|
| FR-REG-001 | Hiển thị giao diện | Form đầy đủ các trường |
| FR-REG-002 | Validate Full Name | Required, min 2 ký tự |
| FR-REG-003 | Validate Username | Required, **10-15 ký tự** |
| FR-REG-004 | Validate Email | Required, strict format với domain |
| FR-REG-005 | Validate Password | **Complexity: uppercase + lowercase + number + special + min 8 chars** |
| FR-REG-006 | Validate Confirm Password | Must match password |
| FR-REG-007 | Submit thành công | Alert + redirect login.html |

**Password Complexity Requirements:**
- Ít nhất 8 ký tự
- Ít nhất 1 chữ IN HOA (A-Z)
- Ít nhất 1 chữ thường (a-z)
- Ít nhất 1 số (0-9)
- Ít nhất 1 ký tự đặc biệt (!@#$%^&*)

**UI Elements:**
- Full Name: id=`fullname`
- Username: id=`username` (10-15 chars)
- Email: id=`email`
- Password: id=`password`
- Confirm Password: id=`confirmPassword`
- Register Button: id=`registerBtn`
- Password Requirements Display: id=`reqLength`, `reqUppercase`, `reqLowercase`, `reqNumber`, `reqSpecial`

---

### Module 3: DASHBOARD PAGE

#### Yêu cầu chức năng:

| Req ID | Yêu cầu | Chi tiết |
|--------|---------|----------|
| FR-DASH-001 | Hiển thị Dashboard | Sidebar + Main content |
| FR-DASH-002 | Sidebar Navigation | 4 menu items, click to activate |
| FR-DASH-003 | Statistics Cards | 4 cards với values |
| FR-DASH-004 | Activity Table | 5 rows với status badges |
| FR-DASH-005 | Load User Info | Từ localStorage |
| FR-DASH-006 | Logout | Xóa localStorage, redirect login |

**UI Elements:**
- User Name: id=`userName`
- User Email: id=`userEmail`
- User Avatar: id=`userAvatar`
- Logout Button: id=`logoutBtn`
- Nav Items: id=`navDashboard`, `navAnalytics`, `navProjects`, `navSettings`
- Stats: id=`statUsers`, `statRevenue`, `statOrders`, `statGrowth`
- Activity Table: id=`activityTable`

---

## Yêu cầu Output

### Format Test Case

Mỗi test case PHẢI có đầy đủ các phần sau:

```markdown
## TC_[MODULE]_[NUMBER]: [Tên Test Case]

**Requirement ID:** [FR-XXX-XXX]
**Priority:** [Critical/High/Medium/Low]
**Test Type:** [Positive/Negative/Boundary/UI/Security]

### Mô tả
[Mô tả ngắn gọn mục đích của test case]

### Preconditions (Điều kiện tiên quyết)
1. [Điều kiện 1]
2. [Điều kiện 2]

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| [Tên field] | [Giá trị] | [Giải thích] |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | [Hành động] | [Kết quả mong đợi] |
| 2 | [Hành động] | [Kết quả mong đợi] |

### Expected Result (Kết quả mong đợi cuối cùng)
- [Kết quả 1]
- [Kết quả 2]

### Actual Result
[Để trống - QA điền khi thực hiện]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run

### Notes
[Ghi chú thêm nếu có]
```

---

## Phân loại Test Cases cần tạo

### 1. POSITIVE TEST CASES (Happy Path)
Các trường hợp người dùng thao tác đúng:
- Login thành công với email/password hợp lệ
- Register thành công với tất cả thông tin hợp lệ
- Dashboard hiển thị đúng thông tin user
- Logout thành công

### 2. NEGATIVE TEST CASES
Các trường hợp người dùng nhập sai:
- Login với email sai format
- Login với password < 6 ký tự
- Login với field trống
- Register với username < 10 hoặc > 15 ký tự
- Register với password thiếu complexity
- Register với password không match

### 3. BOUNDARY VALUE TEST CASES
Test các giá trị biên:
| Field | Min Valid | Min Invalid | Max Valid | Max Invalid |
|-------|-----------|-------------|-----------|-------------|
| Username | 10 chars | 9 chars | 15 chars | 16 chars |
| Password (Login) | 6 chars | 5 chars | - | - |
| Password (Register) | 8 chars | 7 chars | - | - |
| Fullname | 2 chars | 1 char | - | - |

### 4. UI/UX TEST CASES
- Responsive design (mobile < 768px)
- Hover effects trên buttons
- Focus states trên inputs
- Error message hiển thị đúng vị trí
- Password requirements highlight real-time

### 5. SECURITY TEST CASES
- Password masked (type="password")
- XSS injection trong input fields
- SQL injection trong input fields
- LocalStorage handling

### 6. NAVIGATION TEST CASES
- Login → Register link
- Register → Login link
- Login success → Dashboard
- Dashboard → Logout → Login

---

## Số lượng Test Cases yêu cầu

| Module | Positive | Negative | Boundary | UI/UX | Security | Navigation | Total |
|--------|----------|----------|----------|-------|----------|------------|-------|
| Login | 2 | 5 | 3 | 3 | 2 | 2 | 17 |
| Register | 2 | 10 | 6 | 4 | 2 | 2 | 26 |
| Dashboard | 3 | 2 | 0 | 3 | 1 | 2 | 11 |
| **TOTAL** | 7 | 17 | 9 | 10 | 5 | 6 | **54** |

---

## Ví dụ Test Cases mẫu

### Ví dụ 1: Positive Test Case

```markdown
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
| 1 | Nhập "user@example.com" vào field Email | Email hiển thị trong field |
| 2 | Nhập "password123" vào field Password | Password được mask (••••) |
| 3 | Click button "Đăng Nhập" | Form được submit |
| 4 | Quan sát kết quả | Redirect đến dashboard.html |

### Expected Result
- Không có error message hiển thị
- localStorage chứa key `isLoggedIn` = "true"
- localStorage chứa key `userEmail` = "user@example.com"
- Trang chuyển sang dashboard.html
- Dashboard hiển thị email user

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run
```

---

### Ví dụ 2: Negative Test Case

```markdown
## TC_REG_010: Đăng ký thất bại với password thiếu chữ in hoa

**Requirement ID:** FR-REG-005
**Priority:** High
**Test Type:** Negative

### Mô tả
Verify hệ thống từ chối password không chứa chữ IN HOA

### Preconditions
1. Mở browser
2. Truy cập trang Register: `register.html`

### Test Data
| Field | Value | Ghi chú |
|-------|-------|---------|
| Full Name | Nguyen Van A | Valid |
| Username | testuser1234 | 12 chars (valid) |
| Email | test@example.com | Valid format |
| Password | password1! | Thiếu uppercase |
| Confirm Password | password1! | Match password |

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Nhập tất cả thông tin theo Test Data | Các field được fill |
| 2 | Quan sát password requirements | "Ít nhất 1 chữ in hoa" vẫn hiển thị ○ |
| 3 | Click button "Đăng Ký" | Form validation fail |

### Expected Result
- Requirement "Ít nhất 1 chữ in hoa (A-Z)" hiển thị ○ (không có ✓)
- Password field có error state
- Form KHÔNG được submit
- KHÔNG redirect về login.html
- KHÔNG hiển thị alert "Đăng ký thành công"

### Actual Result
[Để trống]

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run
```

---

### Ví dụ 3: Boundary Test Case

```markdown
## TC_REG_015: Username với đúng 10 ký tự (Boundary - Minimum Valid)

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
- Error message "Username phải có độ dài từ 10-15 ký tự" KHÔNG hiển thị
- Form có thể submit (nếu các field khác valid)

### Status
[ ] Pass  [ ] Fail  [ ] Blocked  [ ] Not Run
```

---

## Hướng dẫn thực hiện

1. **Đọc kỹ Requirements** - Hiểu rõ từng yêu cầu
2. **Xác định Test Types** - Positive, Negative, Boundary, UI, Security
3. **Viết Test Cases** theo format chuẩn
4. **Review Test Cases** - Đảm bảo coverage đầy đủ
5. **Prioritize** - Critical > High > Medium > Low

---

## Lưu ý quan trọng

1. ✅ Mỗi test case chỉ test MỘT điều kiện cụ thể
2. ✅ Test data phải rõ ràng, cụ thể
3. ✅ Steps phải đủ chi tiết để ai cũng thực hiện được
4. ✅ Expected result phải đo lường được (measurable)
5. ✅ Link tới Requirement ID để traceability
6. ✅ Sử dụng actual Element IDs trong steps

---

## Output yêu cầu

Hãy generate **TẤT CẢ 54 test cases** theo bảng phân loại ở trên, nhóm theo:

1. **Login Module** (17 test cases)
2. **Register Module** (26 test cases)  
3. **Dashboard Module** (11 test cases)

Mỗi test case PHẢI theo format chuẩn đã cho. Đảm bảo:
- Đánh số liên tục: TC_LOGIN_001, TC_LOGIN_002...
- Cover tất cả Requirements (FR-XXX)
- Cover cả Positive và Negative scenarios
- Test đầy đủ Boundary Values
- Include UI/UX và Security tests

**BẮT ĐẦU GENERATE TEST CASES NGAY BÂY GIỜ!**
