import { app, BrowserWindow, ipcMain, globalShortcut, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import express from 'express';
import { google } from 'googleapis'; 

let mainWindow: BrowserWindow | null = null;

// [ĐỌC MÃ BẢO MẬT TỪ KÉT SẮT ẨN - CauHinh.json]
// Tuyệt đối không hardcode trong mã nguồn!
let GOOGLE_CLIENT_ID = '';
let GOOGLE_CLIENT_SECRET = '';

try {
  // Đường dẫn tới file CauHinh.json ở thư mục gốc (Cách app 2 cấp thư mục)
  const configPath = path.join(__dirname, '../../../CauHinh.json');
  if (fs.existsSync(configPath)) {
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    GOOGLE_CLIENT_ID = configData.google_oauth.client_id;
    GOOGLE_CLIENT_SECRET = configData.google_oauth.client_secret;
    console.log("[Bảo mật] Đã nạp Thành công Mã API từ Két ẩn.");
  } else {
    console.error("[Bảo mật] Lỗi: Không tìm thấy file CauHinh.json!");
  }
} catch (e) {
  console.error("[Bảo mật] Lỗi đọc cấu hình: ", e);
}

const REDIRECT_URI = 'http://127.0.0.1:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 650,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
  mainWindow.setAlwaysOnTop(true, 'floating');
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('CommandOrControl+Shift+E', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });

  ipcMain.on('close-app', () => app.quit());
  ipcMain.on('minimize-app', () => mainWindow?.minimize());

  // 1. Phép thuật Đăng nhập Google (Chuẩn Authorization Code Flow)
  ipcMain.handle('login-google', async () => {
    return new Promise((resolve, reject) => {
      const expressApp = express();
      
      // Mở cổng 3000 chờ Google quăng cái CODE về
      const server = expressApp.listen(3000, '127.0.0.1', () => {
        console.log('Đang chờ Nữ Hoàng cấp quyền trên Trình duyệt...');
      });
      
      // Tạo URL đăng nhập chuẩn Authorization Code Flow
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Bắt buộc để lấy Refresh Token (Giữ đăng nhập vĩnh viễn)
        prompt: 'consent',      // Ép nó hiện bảng xin quyền
        scope: ['https://www.googleapis.com/auth/drive.file', 'email', 'profile'],
      });

      // Mở Chrome của Nữ Hoàng
      shell.openExternal(authUrl);

      // Điểm hứng Code trả về từ Google
      expressApp.get('/oauth2callback', async (req, res) => {
        const code = req.query.code as string;
        if (code) {
          res.send('<h1>Kính chào Nữ Hoàng!</h1><p>Giao thức kết nối Đám mây thành công. Nữ Hoàng có thể đóng tab này và quay lại Két Sắt.</p><script>setTimeout(() => window.close(), 3000);</script>');
          server.close(); // Đóng cổng sau khi nhận được hàng
          
          try {
            // Dùng cái CODE đổi lấy TOKEN (Cần có SECRET mới làm được bước này)
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);
            
            // Lấy thông tin Email bằng bộ thư viện chuẩn
            const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
            const userInfo = await oauth2.userinfo.get();

            resolve({ 
              success: true, 
              email: userInfo.data.email, 
              token: tokens.access_token 
            });
          } catch (error) {
            console.error('Lỗi khi đổi CODE lấy TOKEN:', error);
            reject(new Error("Lỗi xác thực Token."));
          }
        } else {
          res.send('Lỗi: Google không trả về Mã xác thực!');
          server.close();
          reject(new Error("Hủy đăng nhập"));
        }
      });
    });
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

