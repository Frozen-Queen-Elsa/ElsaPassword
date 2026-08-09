import { app, BrowserWindow, ipcMain, globalShortcut, shell } from 'electron';
import path from 'path';
import crypto from 'crypto';

let mainWindow: BrowserWindow | null = null;

// Thông tin OAuth2 giả định (Cần thay bằng Client ID thật từ Google Cloud Console)
const GOOGLE_CLIENT_ID = 'NHAP_CLIENT_ID_CUA_BAN.apps.googleusercontent.com';
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';

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

  // 1. Phép thuật Đăng nhập Google thật sự (OAuth 2.0)
  ipcMain.handle('login-google', async () => {
    return new Promise((resolve, reject) => {
      // Dùng tính năng an toàn để mở URL bằng Trình duyệt Mặc định của Hệ điều hành (Chrome/Edge)
      // Đây là cách cực chuẩn của các App PC (như Spotify, Discord, Notion)
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/drive.file&access_type=offline`;
      
      // Mở bằng trình duyệt Chrome (để tận dụng tài khoản đã login sẵn)
      shell.openExternal(authUrl);

      // (Tạm thời giả lập việc người dùng copy cái CODE dán lại vào App sau khi login trên Web)
      // Trong thực tế sẽ cần một màn hình phụ hoặc chạy localhost server để hứng code này
      setTimeout(() => {
        resolve({ success: true, email: 'nuhoang.bang@gmail.com', token: 'fake_access_token_123' });
      }, 3000); // Đợi 3 giây mô phỏng việc thao tác trên Chrome
    });
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
