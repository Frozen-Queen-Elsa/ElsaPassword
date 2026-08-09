const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 650,
    transparent: true, // Xóa nền trắng, cho phép hiệu ứng Kính Băng
    frame: false,      // Xóa khung cửa sổ mặc định của Windows
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load UI từ Vite (Chạy nội bộ)
  // Trong môi trường dev, sẽ dùng localhost. Ở đây code chuẩn bị sẵn cho build.
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Luôn hiển thị trên cùng khi được gọi
  mainWindow.setAlwaysOnTop(true, 'floating');
}

app.whenReady().then(() => {
  createWindow();

  // Đăng ký Phím Tắt Ma Thuật (Ctrl + Shift + E) để gọi App PC lên
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

  // Nhận lệnh tắt app từ UI Kính Băng (Nút X)
  ipcMain.on('close-app', () => {
    app.quit();
  });

  // Nhận lệnh thu nhỏ (Minimize)
  ipcMain.on('minimize-app', () => {
    mainWindow.minimize();
  });

  // Giả lập phép thuật Auto-Type (Tự gõ phím)
  ipcMain.on('auto-type', (event, { username, password }) => {
    console.log("Đang thi triển Auto-Type cho tài khoản:", username);
    mainWindow.hide(); // Ẩn Lâu đài băng đi để nhường chỗ cho game/app
    
    // TODO: Tích hợp thư viện @nut-tree/nut-js để gõ phím thật vào Windows
    // Code mô phỏng sự chờ đợi
    setTimeout(() => {
      console.log(`[Giả lập] Gõ: ${username} -> Bấm Tab -> Gõ: ${password} -> Bấm Enter`);
    }, 500);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
