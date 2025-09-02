import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: ['urban-6bqf.onrender.com', '.onrender.com']
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: ['urban-6bqf.onrender.com', '.onrender.com']
  }
})
