import path from 'path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue(),
    UnoCSS(),
    Components({
      dts: './types/components.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: ['vue', 'vue-router', '@vueuse/core'],
      eslintrc: {
        enabled: true
      },
      dirs: ['./src/composables']
    }),
    VueDevTools()
  ]
})
