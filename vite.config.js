import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src/shared/ui'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@api': path.resolve(__dirname, './src/shared/api'),
      '@lib': path.resolve(__dirname, './src/shared/lib'),
      '@config': path.resolve(__dirname, './src/shared/config'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
