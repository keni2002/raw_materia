import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// run package config
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // pass the environment variables to Vite
    'process.env': JSON.stringify(process.env)
  }
});