/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // legacy(),
    // VitePWA({ registerType: 'autoUpdate' }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        short_name: "Muslim Hands App (DEMO)",
        name: "Muslim Hands - Donor Portal App",
        start_url: ".",
        display: "standalone",
        theme_color: "#007089",
        background_color: "#ffffff",
        icons: [
          {
            src: "assets/icon/icon.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon"
          },
          {
            src: "assets/icon/icon.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          }
        ]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  // publicDir: 'public',
})
