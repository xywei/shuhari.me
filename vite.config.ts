import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command, isPreview }) => ({
  appType: command === 'serve' && !isPreview ? 'spa' : 'mpa',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex],
      }),
    },
    react({ include: /\.(mdx|tsx|ts|jsx|js)$/ }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  build: {
    sourcemap: true,
  },
}))
