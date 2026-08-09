@echo off
set PATH=%PATH%;C:\Program Files\nodejs

echo [Nu Hoang Elsa] Dang trieu hoi Lau dai bang PC...
cd "C:\Users\admin\Desktop\Tool OpenAI\Tool ElsaPassword\packages\pc-app"

echo.
echo [1/3] Dang cai dat thu vien (npm install)...
call npm install

echo.
echo [2/3] Dang khoi dong loi Kinh Bang (Vite Server)...
start cmd /k "set PATH=%PATH%;C:\Program Files\nodejs && title Vite Server && npm run dev"

echo.
echo [3/3] Dang goi Cua So Ma Thuat (Electron)...
echo Vui long doi 5 giay de he thong on dinh...
timeout /t 5 /nobreak > nul

set VITE_DEV_SERVER_URL=http://localhost:5173
call npm run start:electron

echo.
echo Da dong ung dung.
pause
