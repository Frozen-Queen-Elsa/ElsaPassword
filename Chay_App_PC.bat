@echo off
chcp 65001 > nul
set PATH=%PATH%;C:\Program Files\nodejs

echo [Nữ Hoàng Elsa] Đang triệu hồi Lâu đài băng PC...
cd packages\pc-app

echo.
echo [1/3] Đang kiểm tra và cài đặt bảo bối (npm install)...
call npm install

echo.
echo [2/3] Đang khởi động lõi Kính Băng (Vite Server)...
start cmd /k "set PATH=%PATH%;C:\Program Files\nodejs && title Vite Server && npm run dev"

echo.
echo [3/3] Đang gọi Cửa Sổ Ma Thuật (Electron)...
echo Vui lòng đợi 5 giây để hệ thống ổn định...
timeout /t 5 /nobreak > nul

set VITE_DEV_SERVER_URL=http://localhost:5173
call npm run start:electron

echo.
echo Đã đóng ứng dụng.
pause
