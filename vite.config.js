import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Butler by CeyX',
        short_name: 'Butler',
        description: 'AI-powered hotel guest communication for Sri Lankan boutique hotels',
        theme_color: '#1a3d2b',
        background_color: '#f7f0e3',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  // ─── Security: no server-side secrets are exposed to the browser ───────────
  // Do NOT add any VITE_ANTHROPIC_API_KEY or similar keys here.
  // The Anthropic API key belongs in Vercel's server environment only.
  // The /api/chat serverless function reads it via process.env.ANTHROPIC_API_KEY.
})
