import { app, BrowserWindow, ipcMain, globalShortcut, shell } from 'electron';
import path from 'path';
import crypto from 'crypto';
import express from 'express';
import { google } from 'googleapis';

let mainWindow: BrowserWindow | null = null;

// [CẮM MÃ GOOGLE CLOUD THẬT CỦA NỮ HOÀNG]
const GOOGLE_CLIENT_ID = '108682335106-j6h3lb61gtr5pc0n51ni467h2996j7jo.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

// Vì Google đổi chính sách (OOB bị cấm), chúng ta không có Client Secret (Desktop App), 
// ta dùng OAuth2Client để sinh URL và lấy mã.
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  '', // Desktop app không cần Secret khi dùng pkce / loopback
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

  // 1. Phép thuật Đăng nhập Google thật sự (Dựng local server hứng Code)
  ipcMain.handle('login-google', async () => {
    return new Promise((resolve, reject) => {
      const expressApp = express();
      
      // Tạo đường link đăng nhập
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/drive.file', 'email', 'profile'],
      });

      // Mở Chrome của Nữ Hoàng
      shell.openExternal(authUrl);

      // Mở server cổng 3000 chờ Chrome trả Code về
      const server = expressApp.listen(3000, () => {
        console.log('Đang chờ Nữ Hoàng cấp quyền trên Trình duyệt...');
      });

      expressApp.get('/oauth2callback', async (req, res) => {
        const code = req.query.code as string;
        if (code) {
          res.send('<h1>Kính chào Nữ Hoàng!</h1><p>Đăng nhập thành công, Nữ Hoàng có thể đóng tab này và quay lại Két Sắt.</p><script>window.close()</script>');
          server.close();
          
          try {
            // Lấy Access Token từ Code (Vì không có secret, ta gọi API thô hoặc dùng googleapis)
            // LƯU Ý: Do thiếu Secret, ta phải dùng cách gọi token không kèm secret
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);
            
            // Lấy thông tin Email
            const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
            const userInfo = await oauth2.userinfo.get();

            resolve({ 
              success: true, 
              email: userInfo.data.email, 
              token: tokens.access_token 
            });
          } catch (error) {
            console.error('Lỗi khi lấy Token:', error);
            reject(new Error("Lỗi xác thực Token."));
          }
        } else {
          res.send('Lỗi: Không nhận được mã xác thực!');
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
