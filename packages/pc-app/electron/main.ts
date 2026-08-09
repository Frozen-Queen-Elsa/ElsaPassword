import { app, BrowserWindow, ipcMain, globalShortcut, shell } from 'electron';
import path from 'path';
import crypto from 'crypto';
import express from 'express';
import axios from 'axios';

let mainWindow: BrowserWindow | null = null;

// [CẮM MÃ GOOGLE CLOUD THẬT CỦA NỮ HOÀNG]
const GOOGLE_CLIENT_ID = '108682335106-j6h3lb61gtr5pc0n51ni467h2996j7jo.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

// BÍ MẬT QUỐC GIA: Mã Secret mà Nữ Hoàng vừa tìm thấy!
// Mã Secret này em sẽ dùng để đổi lấy Token một cách hợp lệ
// Chú ý: Vì an toàn em sẽ chỉ lấy đoạn mã chị gửi (****NXxb),
// Xin Nữ Hoàng cung cấp nguyên vẹn dải mã Client secret này cho em nhé (Nếu chị muốn xài kiểu Web App)!

// TUY NHIÊN, VÌ ĐÂY LÀ "DESKTOP APP", GOOGLE ĐÃ THAY ĐỔI LUẬT MỚI NHẤT (Tháng 2/2022).
// Desktop App hiện nay KHÔNG HỖ TRỢ ô nhập "Authorized redirect URIs" trên Web Console nữa.
// Google bắt buộc Desktop App phải dùng "Loopback IP address" (tức là 127.0.0.1).

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

  // 1. Phép thuật Đăng nhập Google Loopback
  ipcMain.handle('login-google', async () => {
    return new Promise((resolve, reject) => {
      const expressApp = express();
      
      // Tạo URL đăng nhập chuẩn Loopback cho Desktop App (Luật mới của Google)
      // Dùng 127.0.0.1 thay vì localhost để tránh lỗi phân giải DNS của Google
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://127.0.0.1:3000&response_type=token&scope=https://www.googleapis.com/auth/drive.file email profile`;

      // Mở Chrome của Nữ Hoàng
      shell.openExternal(authUrl);

      // Mở server cổng 3000 chờ Chrome trả Token về (Implicit Flow)
      // Vì là Desktop App không có redirect URI, ta dùng Implicit Flow trả thẳng Token lên URL
      const server = expressApp.listen(3000, () => {
        console.log('Đang chờ Nữ Hoàng cấp quyền trên Trình duyệt...');
      });

      // Bắt request trả về ở trang chủ
      expressApp.get('/', (req, res) => {
        // Vì token nằm sau dấu # (fragment), server NodeJS không đọc được trực tiếp.
        // Ta phải trả về 1 đoạn mã JS siêu nhỏ xuống trình duyệt Chrome để nó gắp token và gửi lại server.
        res.send(`
          <html><body>
          <script>
            const hash = window.location.hash.substring(1);
            fetch('http://127.0.0.1:3000/process_token?' + hash).then(() => {
              document.body.innerHTML = '<h1>Kính chào Nữ Hoàng!</h1><p>Đăng nhập thành công, Nữ Hoàng có thể đóng tab này và quay lại Két Sắt.</p>';
              setTimeout(() => window.close(), 2000);
            });
          </script>
          </body></html>
        `);
      });

      // Nhận token từ đoạn JS trên
      expressApp.get('/process_token', async (req, res) => {
        const token = req.query.access_token as string;
        if (token) {
          res.sendStatus(200);
          server.close();
          
          try {
            // Lấy email để hiển thị (Dùng axios gọi API thô cho nhẹ)
            const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: { Authorization: \`Bearer \${token}\` }
            });

            resolve({ 
              success: true, 
              email: userInfo.data.email, 
              token: token 
            });
          } catch (error) {
            console.error('Lỗi khi lấy User Info:', error);
            reject(new Error("Lỗi lấy thông tin Email."));
          }
        } else {
          res.sendStatus(400);
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
