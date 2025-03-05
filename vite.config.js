import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'


// https://vite.dev/config/
export default defineConfig({
  base: '/advice-generator',
  plugins: [
    react(),
    viteStaticCopy({
        src: 'assets/**/*', // Copy all images from assets directory
        dest: 'assets' // Maintain the directory structure in the dist folder
    })
  ],
})
