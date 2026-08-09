# CHỈ NAM DỰ ÁN (SỔ TAY CỐT LÕI)

## 1. Thông Tin Chung
- **Tên dự án:** Elsa Password Manager
- **Theme:** Frozen 2 (Minimalist, Băng Giá).
- **Mục tiêu:** Quản lý mật khẩu cá nhân, đa nền tảng, mã hóa AES-256, đồng bộ qua Google Drive cá nhân.

## 2. Core Logic & Bảo Mật (`packages/core-logic`)
- **Master Password:** Không lưu lại. Dùng PBKDF2/Argon2 để băm ra Encryption Key.
- **Mã Hóa:** Toàn bộ danh sách mật khẩu bọc vào JSON, sau đó mã hóa bằng `AES-256-GCM` -> Tạo thành chuỗi ký tự vô nghĩa -> Lưu vào file `.ice`.
- **Google Drive Sync:** Dùng OAuth2 để xin quyền `drive.file`. Đọc/Ghi trực tiếp file `.ice`.
- **Local Backup:** Luôn lưu 1 bản file `.ice` mã hóa xuống thiết bị để dự phòng rớt mạng/mất tài khoản.

## 3. Quy Ước Lập Trình
- Bắt buộc dùng `TypeScript` cho toàn bộ các package.
- Giao diện UI phải tái sử dụng Component, màu sắc gọi từ `theme` (không hardcode màu Hex vào file UI).
- Mọi hàm nhạy cảm phải được bọc bằng khối `try...catch` và xuất Log ẩn.

## 4. Bản Thử Nghiệm Nhanh
- File `Elsa_Demo_Test.html` được tạo ra để User có thể test ngay lập tức UI Băng giá và logic mã hóa AES-256 mà không cần setup môi trường React Native hay Node.js phức tạp.