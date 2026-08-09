# LỊCH SỬ PHIÊN BẢN

> **Quy tắc đánh số Version (X.YY.ZZ):**
> - **X (Big Update):** Cập nhật lớn khi hoàn thiện toàn bộ một module/tính năng lớn.
> - **YY (Function Update):** Cập nhật khi một function/chức năng độc lập code đúng và thành công.
> - **ZZ (Patch Update):** Các bản cập nhật nhỏ, sửa lỗi (fix bug), hoặc điều chỉnh UI.

## [v0.01.00] - Hoàn thiện Ứng dụng PC (Electron + React)
- **Ngày:** Hôm nay
- **Người thực hiện:** Nữ Hoàng Elsa
- **Nội dung:**
  - Khởi tạo thành công kiến trúc App PC với `Electron` và `React (Vite)`.
  - Thiết kế cửa sổ Không Viền (Frameless Window) trong suốt, hiển thị giao diện Kính Băng cực mượt.
  - Tích hợp Phím tắt Toàn cầu (Global Shortcut): Nhấn `Ctrl + Shift + E` ở bất kỳ đâu trên Windows để triệu hồi Két sắt.
  - Tích hợp cầu nối `IPC` và giao diện chức năng **Auto-Type** (Tự động gõ phím) để đăng nhập các game/app như Riot Client, Zalo PC.

## [v0.00.05] - Tạo giao diện Kính Băng cho Điện thoại và Trình duyệt (Extension)
- **Ngày:** Hôm nay
- **Người thực hiện:** Nữ Hoàng Elsa
- **Nội dung:**
  - Tạo `Elsa_Mobile_UI_Test.html` (Khung Kính Băng cho Mobile, FaceID).
  - Tạo `Elsa_Extension_UI_Test.html` (Khung Popup nhận diện trang Web tự động).

## [v0.00.04] - Bản Demo HTML Thử Nghiệm Nhanh
- **Ngày:** Hôm nay
- **Người thực hiện:** Nữ Hoàng Elsa
- **Nội dung:**
  - Phát hành file `Elsa_Demo_Test.html` chạy độc lập không cần cài đặt Node.js.
  - Tích hợp giao diện Frozen 2 (TailwindCSS) với hiệu ứng ô nhập liệu ma thuật.
  - Tích hợp Core Logic mã hóa AES (CryptoJS) trực tiếp vào script để User trải nghiệm thực tế cảm giác "Đóng băng" két sắt.

## [v0.00.03] - Khởi tạo Giao diện Băng Giá (UI Components)
- **Ngày:** Hôm nay
- **Người thực hiện:** Nữ Hoàng Elsa
- **Nội dung:**
  - Định nghĩa bảng màu `colors.ts` chuẩn Frozen 2.
  - Viết Component `ElsaButton.tsx` tùy biến.
  - Viết Component `ElsaTextInput.tsx` với hiệu ứng viền sáng xanh ma thuật khi gõ.

## [v0.00.02] - Xây dựng Module Đồng bộ Google Drive
- **Ngày:** Hôm nay
- **Người thực hiện:** Nữ Hoàng Elsa
- **Nội dung:**
  - Viết module `drive`: Tích hợp các hàm tải lên, tải xuống và tìm kiếm file `.ice` trên Google Drive bằng REST API.

## [v0.00.01] - Khởi tạo Core Logic & Module Mã Hóa
- **Ngày:** Hôm nay
- **Người thực hiện:** Nữ Hoàng Elsa
- **Nội dung:**
  - Áp dụng quy tắc đánh số Version mới.
  - Khởi tạo package `core-logic` với TypeScript.
  - Viết thành công module `crypto` (Sử dụng `crypto-js`):
    - Hàm `generateEncryptionKey`: Băm Mật khẩu chủ bằng thuật toán PBKDF2 an toàn.
    - Hàm `encryptVault`: Mã hóa dữ liệu bằng AES.
    - Hàm `decryptVault`: Giải mã dữ liệu Két sắt.
  - Thiết lập thành công Interface (Types) cho cấu trúc dữ liệu.

## [v0.00.00] - Chuẩn bị hạ tầng
- **Ngày:** Hôm nay
- **Người thực hiện:** Nữ Hoàng Elsa
- **Nội dung:**
  - Di dời dự án về thư mục mới, import icon.
  - Khởi tạo cấu trúc Monorepo.