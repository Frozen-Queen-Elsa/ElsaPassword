@echo off
chcp 65001 > nul
echo [Nữ Hoàng Elsa] Đang triệu hồi Lâu đài băng PC...
cd packages\pc-app

echo.
echo [1/3] Đang kiểm tra và cài đặt bảo bối (npm install)...
call npm install

echo.
echo [2/3] Đang khởi động lõi Kính Băng (Vite Server)...
start cmd /k "title Vite Server Kiem Tra Giao Dien && npm run dev"

echo.
echo [3/3] Đang gọi Cửa Sổ Ma Thuật (Electron)...
echo Vui lòng đợi 3 giây để hệ thống ổn định...
timeout /t 3 /nobreak > nul

set VITE_DEV_SERVER_URL=http://localhost:5173
call npm run start:electron

echo.
echo Đã đóng ứng dụng.
pause
