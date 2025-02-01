import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['e5b4-39-55-117-213.ngrok-free.app', 'localhost', '127.0.0.1'], // Add your ngrok host here
},
})
