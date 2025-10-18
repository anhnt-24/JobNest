# 🧭 JobNest – Nền tảng tìm kiếm việc làm

**JobNest** là nền tảng giúp **ứng viên (Candidate)** dễ dàng tìm việc và nộp hồ sơ, đồng thời hỗ trợ **nhà tuyển dụng (Employer)** và **công ty (Company)** trong việc đăng tin và quản lý tuyển dụng.  
**Admin** có quyền kiểm duyệt và quản trị toàn bộ hệ thống.

---

## 🚀 Công nghệ sử dụng

**Frontend:** Next.js 15, TypeScript, TailwindCSS, ShadCN/UI, SWR, Zustand, Axios  
**Backend:** NestJS, Prisma, PostgreSQL, Redis, MinIO

---

## 👥 Vai trò hệ thống

| Vai trò                | Mô tả ngắn                                                                |
| ---------------------- | ------------------------------------------------------------------------- |
| **Admin**              | Quản lý người dùng, công việc, công ty, kiểm duyệt nội dung.              |
| **Company / Employer** | Đăng và quản lý tin tuyển dụng, xem danh sách ứng viên.                   |
| **Candidate**          | Tìm kiếm việc làm, tạo hồ sơ, upload CV và theo dõi trạng thái ứng tuyển. |

---

## 🔑 Chức năng chính

- Đăng nhập / Đăng ký / Phân quyền người dùng
- Tìm kiếm, lọc và xem chi tiết công việc
- Ứng viên tạo hồ sơ, upload CV, nộp đơn ứng tuyển
- Nhà tuyển dụng đăng tin, quản lý ứng viên, cập nhật trạng thái
- Hệ thống thông báo và chat real-time
- Admin quản trị và thống kê toàn hệ thống
