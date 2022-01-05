import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  server: {
    proxy: {
      "/bg": {
        target: "http://ip3x.com",
        changeOrigin: true,
      },
    },
  },
})
