import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ⚠️ Change 'cyber-security-roadmap' to your actual repo name
  base: '/cyber-security-roadmap/',
  build: {
    outDir: 'dist',
  },
})
