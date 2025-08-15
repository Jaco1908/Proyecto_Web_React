import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react({
    include: ['**/*.jsx', '**/*.js'],
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  base: '/',
});