# SƠ ĐỒ DỰ ÁN CHI TIẾT: ELSA PASSWORD MANAGER

**Kiến trúc:** Monorepo (Yarn/npm Workspaces)
**Công nghệ:** TypeScript, React Native, Electron, React + Vite

```text
Tool ElsaPassword/
├── 📦 packages/
│   ├── 🧠 core-logic/           # Logic lõi (Trái tim của hệ thống)
│   │   ├── src/
│   │   │   ├── crypto/          # Chứa logic AES-256-GCM, PBKDF2
│   │   │   ├── drive/           # Xử lý API gọi lên Google Drive
│   │   │   ├── types/           # Khai báo các Interface/Kiểu dữ liệu TypeScript
│   │   │   └── index.ts         # Điểm xuất (Export) các hàm ra bên ngoài
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── 📱 mobile-app/           # App Điện thoại (React Native / Expo)
│   │   ├── assets/              # Hình ảnh, font chữ Frozen 2
│   │   ├── src/
│   │   │   ├── components/      # (UI) Button, Input, Biểu tượng hoa tuyết
│   │   │   ├── screens/         # (View) Màn hình Két Sắt, Cài đặt
│   │   │   ├── navigation/      # Cấu hình chuyển trang
│   │   │   └── theme/           # Định nghĩa màu Băng giá (Tailwind config)
│   │   ├── App.tsx              # Khởi chạy App
│   │   └── package.json
│   ├── 💻 pc-app/               # App Máy tính Windows/Mac (Electron)
│   │   ├── electron/            # Logic chạy ngầm cấp hệ điều hành (Node.js)
│   │   ├── src/                 # Giao diện App PC (React)
│   │   └── package.json
│   └── 🧩 browser-ext/          # Tiện ích trình duyệt (Tự điền Pass)
│       ├── public/              # Chứa manifest.json, icon extension
│       ├── src/
│       │   ├── background/      # Script chạy ngầm trong trình duyệt
│       │   ├── content/         # Script thọc vào trang web để lấy form nhập pass
│       │   └── popup/           # Giao diện UI khi bấm vào icon extension
│       ├── vite.config.ts
│       └── package.json
├── 📄 elsa.ico                  # Icon của App
├── 📄 Elsa_Demo_Test.html       # [BẢN THỬ NGHIỆM] File chạy trực tiếp cho User test UI và Logic
├── 📄 CauHinh.json              # File Config chung
├── 📄 SoDoDuAn.md               # Sơ đồ này
├── 📄 LichSuPhienBan.md         # Lịch sử cập nhật
└── 📄 ChiNamDuAn.md             # Sổ tay lập trình
```

*Lưu ý: Bắt buộc cập nhật file này khi có thay đổi về cấu trúc.*