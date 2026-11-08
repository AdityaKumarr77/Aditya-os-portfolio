import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { CSP_META } from './scripts/security.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Injects the production Content-Security-Policy as a <meta> tag.
// Build-only: the dev server needs the inline React refresh preamble.
function cspPlugin(): Plugin {
  return {
    name: 'aditya-os-csp',
    apply: 'build',
    transformIndexHtml(html) {
      const tag = `<meta http-equiv="Content-Security-Policy" content="${CSP_META}" />`
      const anchor = '<meta charset="UTF-8" />'
      if (!html.includes(anchor)) {
        throw new Error('CSP plugin: charset meta tag not found in index.html')
      }
      return html.replace(anchor, `${anchor}\n    ${tag}`)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cspPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
