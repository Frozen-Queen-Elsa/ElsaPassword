import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-app'),
  minimizeApp: () => ipcRenderer.send('minimize-app'),
  loginGoogle: () => ipcRenderer.invoke('login-google'),
  triggerAutoType: (credentials: any) => ipcRenderer.send('auto-type', credentials)
});