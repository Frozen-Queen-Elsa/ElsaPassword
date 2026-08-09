# MỤC TIÊU DỰ ÁN: ELSA PASSWORD MANAGER

## 1. Tầm Nhìn (Vision)
Tạo ra một phần mềm quản lý mật khẩu riêng biệt cho gia đình, an toàn tuyệt đối (Zero-Knowledge), đẹp mắt (Theme Frozen 2) và cực kỳ nhẹ. Không phụ thuộc vào máy chủ của bên thứ ba, quyền kiểm soát dữ liệu 100% thuộc về người dùng.

## 2. Tính Năng Cốt Lõi (Core Features)
1. **Lưu trữ phi tập trung:** Dữ liệu mã hóa (`.ice`) được lưu trực tiếp trên Google Drive cá nhân của người dùng. Mỗi tài khoản Google Drive là một Két sắt riêng biệt.
2. **Bảo mật tối đa:** 
   - Mã hóa chuẩn quân đội AES-256-GCM.
   - Master Password không bao giờ được lưu lại.
   - Có Mật Khẩu Phụ (Recovery PIN) và Gợi ý mật khẩu để phòng trường hợp quên.
3. **Đa nền tảng (Write Once, Run Anywhere):**
   - App Di Động (Android/iOS) bằng React Native.
   - App Máy Tính (Windows) bằng Electron/React.
   - Tiện ích Trình duyệt (Chrome/Edge Extension) bằng React/Vite.
4. **Tự Động Điền (Autofill):** Tích hợp sâu vào hệ điều hành (Android/iOS) và trình duyệt PC để gợi ý và tự điền mật khẩu siêu tốc.
5. **Sinh trắc học:** Hỗ trợ mở khóa nhanh Két sắt bằng FaceID/Vân tay thay vì gõ Master Password nhiều lần.
6. **Sao lưu nội bộ (Local Backup):** Tự động tạo bản sao lưu file `.ice` ngay trong máy để đề phòng mất tài khoản Google Drive.

## 3. Tiêu Chí Kỹ Thuật & UI/UX
- **Tech Stack:** Kiến trúc Monorepo, dùng chung Core Logic viết bằng TypeScript. Giao diện React.
- **UI/UX:** Phong cách "Wow Frozen 2" (Glassmorphism - Kính Băng mờ). Nền ma thuật sâu thẳm (Ahtohallan), các thẻ giao diện là lớp băng trong suốt, viền phát sáng Cyan. Không dùng nền trắng đơn điệu.
- **Hiệu năng:** Khởi động dưới 1 giây, không sử dụng animation thừa. Nhẹ và ổn định.