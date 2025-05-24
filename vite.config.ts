import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "ES2022" // Set the target to ES2022 for better compatibility with modern browsers
  },
})
