import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './', // Đường dẫn tương đối để chạy được trong Electron
  build: {
    outDir: 'dist',
  }
});
