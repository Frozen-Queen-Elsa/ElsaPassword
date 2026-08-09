const { contextBridge, ipcRenderer } = require('electron');

// Cầu nối giao tiếp giữa Giao diện Kính Băng (React) và Hệ điều hành Windows (Electron)
contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-app'),
  minimizeApp: () => ipcRenderer.send('minimize-app'),
  triggerAutoType: (credentials) => ipcRenderer.send('auto-type', credentials)
});