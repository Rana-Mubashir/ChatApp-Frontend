import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Env from './src/Env/Env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':Env.server, // Replace with your backend server URL
    },
  },
})
