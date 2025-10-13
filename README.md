# 🧭 JobNest – Nền tảng tìm kiếm việc làm

**JobNest** là một nền tảng web giúp **ứng viên (Candidate)** dễ dàng tìm kiếm và ứng tuyển vào các công việc phù hợp, đồng thời hỗ trợ **nhà tuyển dụng (Employer)** và **công ty (Company)** trong việc đăng tin, quản lý tuyển dụng.  
**Admin** có quyền quản trị toàn bộ hệ thống, giám sát và kiểm duyệt nội dung.

---

## 🚀 Công nghệ sử dụng

### 🖥️ Frontend

- **Next.js 14 (App Router)** – Framework React mạnh mẽ cho SEO và hiệu năng cao.
- **TailwindCSS + ShadCN/UI** – Giao diện hiện đại, dễ tùy biến.
- **React Query / TanStack Query** – Quản lý dữ liệu client hiệu quả.
- **Axios** – Giao tiếp API.
- **Framer Motion** – Hiệu ứng động mượt mà.

### ⚙️ Backend

- **NestJS** – Framework Node.js mạnh mẽ với kiến trúc module rõ ràng.
- **PostgreSQL** – CSDL quan hệ, lưu trữ dữ liệu chính (users, jobs, applications,...).
- **Redis** – Lưu cache, token, và hỗ trợ tính năng real-time.
- **MinIO** – Lưu trữ tệp (CV, ảnh đại diện, logo công ty,...).
- **Prisma ORM** – Quản lý truy vấn và migration cơ sở dữ liệu.

---

## 👥 Các vai trò trong hệ thống

| Vai trò       | Mô tả                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------ |
| **Admin**     | Quản lý toàn bộ hệ thống: người dùng, công việc, công ty, báo cáo, quyền truy cập.         |
| **Company**   | Hồ sơ công ty, quản lý thông tin giới thiệu, ngành nghề, logo, và các tin tuyển dụng.      |
| **Employer**  | Người thuộc công ty, đăng tin tuyển dụng, xem danh sách ứng viên, xử lý hồ sơ ứng tuyển.   |
| **Candidate** | Ứng viên tìm việc, tạo hồ sơ cá nhân, upload CV, nộp đơn và theo dõi trạng thái ứng tuyển. |

---

# 🔑 Chức năng chính

### 👨‍💼 Dành cho Employer / Company

- Tạo và chỉnh sửa tin tuyển dụng.
- Quản lý danh sách ứng viên nộp hồ sơ.
- Cập nhật thông tin công ty.

### 👨‍🎓 Dành cho Candidate

- Tìm kiếm việc làm theo từ khóa, địa điểm, ngành nghề.
- Tạo hồ sơ cá nhân, upload CV.
- Nộp đơn và theo dõi trạng thái.

### 🛠️ Dành cho Admin

- Quản lý người dùng, công việc, công ty, phản hồi người dùng.
- Kiểm duyệt tin đăng và thống kê hệ thống.

---
