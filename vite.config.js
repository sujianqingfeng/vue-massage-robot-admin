import path from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/linghu',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue(),
    VueJsx(),
    UnoCSS(),
    Components({
      extensions: ['vue', 'jsx'],
      dts: './types/components.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      eslintrc: {
        enabled: true
      },
      dirs: ['./src/composables'],
      resolvers: [ElementPlusResolver()]
    }),
    VueDevTools()
  ],
  server: {
    proxy: {
      '/linghuRobot': {
        target: 'https://8q57s08803.vicp.fun',
        changeOrigin: true
      }
    }
  }
})
