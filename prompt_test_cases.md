# PROMPT: Generate Test Cases cho Login/Register/Dashboard Pages

## Mục đích
Bạn là một QA Engineer chuyên nghiệp. Hãy tạo bộ test cases chi tiết và toàn diện cho 3 trang web: **Login**, **Register**, và **Dashboard**.

---

## Thông tin về các Pages cần test

### 1. Login Page (`login.html`)

**Các elements chính:**
| Element | ID | Type | Validation Rules |
|---------|-----|------|------------------|
| Email input | `email` | email | Required, email format |
| Password input | `password` | password | Required, min 6 ký tự |
| Login button | `loginBtn` | submit | - |
| Register link | - | anchor | Redirect to register.html |

**Form validation:**
- Email: Regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password: Minimum 6 characters
- Error class: `.form-group.error`

---

### 2. Register Page (`register.html`)

**Các elements chính:**
| Element | ID | Type | Validation Rules |
|---------|-----|------|------------------|
| Full name input | `fullname` | text | Required, min 2 ký tự |
| **Username input** | `username` | text | **Required, 10-15 ký tự** |
| Email input | `email` | email | Required, strict format: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` |
| Password input | `password` | password | **Required, min 8 ký tự, phải có: uppercase, lowercase, số, ký tự đặc biệt** |
| Password requirements | `reqLength`, `reqUppercase`, `reqLowercase`, `reqNumber`, `reqSpecial` | div | Real-time validation feedback |
| Confirm password | `confirmPassword` | password | Required, must match password |
| Register button | `registerBtn` | submit | - |
| Login link | - | anchor | Redirect to login.html |

**Password Complexity Requirements:**
- Ít nhất 8 ký tự
- Ít nhất 1 chữ in hoa (A-Z)
- Ít nhất 1 chữ thường (a-z)
- Ít nhất 1 số (0-9)
- Ít nhất 1 ký tự đặc biệt (!@#$%^&*)

---


### 3. Dashboard Page (`dashboard.html`)

**Các elements chính:**
| Element | ID | Description |
|---------|-----|-------------|
| User name display | `userName` | Hiển thị tên user |
| User email display | `userEmail` | Hiển thị email |
| User avatar | `userAvatar` | Hiển thị chữ cái đầu |
| Logout button | `logoutBtn` | Đăng xuất, redirect to login |
| Navigation links | `navDashboard`, `navAnalytics`, `navProjects`, `navSettings` | Menu items |
| Stats cards | `statUsers`, `statRevenue`, `statOrders`, `statGrowth` | Thống kê |
| Activity table | `activityTable` | Bảng hoạt động gần đây |

---

## Yêu cầu Test Cases

### 1. Functional Test Cases
Tạo test cases cho các chức năng chính:
- [ ] Login với credentials hợp lệ
- [ ] Login với email không hợp lệ
- [ ] Login với password ngắn (<6 ký tự)
- [ ] Login với fields trống
- [ ] Register với tất cả thông tin hợp lệ
- [ ] Register với password không khớp
- [ ] Register với email đã tồn tại (nếu có backend)
- [ ] Navigation giữa Login và Register
- [ ] Dashboard hiển thị thông tin user
- [ ] Logout và redirect về login

### 2. UI/UX Test Cases
- [ ] Responsive design trên mobile (< 768px)
- [ ] Responsive design trên tablet
- [ ] Hover effects trên buttons
- [ ] Focus states trên input fields
- [ ] Error message hiển thị đúng vị trí
- [ ] Animation/transitions hoạt động smooth
- [ ] Font loading (Inter from Google Fonts)
- [ ] Color scheme consistency

### 3. Negative Test Cases
- [ ] SQL injection trong input fields
- [ ] XSS attack trong input fields
- [ ] Nhập ký tự đặc biệt trong fullname
- [ ] Email với format sai (thiếu @, thiếu domain)
- [ ] Password chỉ có spaces
- [ ] Nhập quá dài trong mỗi field (>255 chars)
- [ ] Copy/paste password có spaces đầu/cuối

### 4. Edge Cases
- [ ] Email với subdomain (user@mail.company.com)
- [ ] Email với ký tự đặc biệt hợp lệ (user+tag@example.com)
- [ ] Password đúng 6 ký tự (boundary)
- [ ] Fullname với 2 ký tự (boundary)
- [ ] Refresh page sau khi nhập form
- [ ] Back button sau khi submit
- [ ] Double click on submit button

### 5. Security Test Cases
- [ ] Password field che ký tự (type="password")
- [ ] Form không autocomplete sensitive data (tùy config)
- [ ] HTTPS validation (nếu deploy)
- [ ] Session/localStorage handling
- [ ] CSRF protection (nếu có backend)

### 6. Accessibility Test Cases
- [ ] Keyboard navigation (Tab order)
- [ ] Screen reader labels
- [ ] Color contrast ratio (WCAG AA)
- [ ] Focus indicators visible
- [ ] Error messages accessible

---

## Output Format mong muốn

Mỗi test case cần có format sau:

```markdown
### TC_[Module]_[Number]: [Test Case Title]

**Preconditions:** 
- Điều kiện tiên quyết

**Test Steps:**
1. Step 1
2. Step 2
3. ...

**Test Data:**
- Input data cần thiết

**Expected Result:**
- Kết quả mong đợi

**Priority:** High/Medium/Low
**Type:** Functional/UI/Negative/Edge/Security/Accessibility
```

---

## Số lượng Test Cases mong muốn

| Module | Số lượng tối thiểu |
|--------|-------------------|
| Login Page | 15 test cases |
| Register Page | 20 test cases |
| Dashboard Page | 15 test cases |
| Cross-module | 10 test cases |
| **Tổng** | **60 test cases** |

---

## Lưu ý quan trọng

1. **Prioritize test cases** theo impact và likelihood of failure
2. **Group test cases** theo module và functionality
3. **Reusable test data** - định nghĩa test data set riêng
4. **Traceability** - link với requirements nếu có
5. **Automation-ready** - test cases phải đủ chi tiết để automate

Hãy generate bộ test cases đầy đủ theo các yêu cầu trên!
