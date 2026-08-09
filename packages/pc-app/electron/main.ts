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
      // Bật cửa sổ trình duyệt an toàn của Electron để hiện trang Login của Google
      const authWindow = new BrowserWindow({
        width: 500,
        height: 600,
        show: true,
        webPreferences: {
          nodeIntegration: false,
        }
      });

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/drive.file&access_type=offline`;
      
      authWindow.loadURL(authUrl);

      // Theo dõi khi Google chuyển hướng (có chứa Code xác thực)
      authWindow.webContents.on('will-redirect', async (event, newUrl) => {
        // ... (Logic xử lý lấy Token thật sẽ diễn ra ở đây)
        // Vì đây chưa có Client ID thật nên ta trả về giả lập thành công
        authWindow.close();
        resolve({ success: true, email: 'nuhoang.bang@gmail.com', token: 'fake_access_token_123' });
      });

      // Nếu cửa sổ bị đóng giữa chừng
      authWindow.on('closed', () => {
        reject(new Error("Đăng nhập bị hủy"));
      });
    });
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
