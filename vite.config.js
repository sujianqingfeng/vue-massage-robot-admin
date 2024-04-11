import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS(),
    VueRouter({
      dts: './types/typed-router.d.ts'
    }),
    Components({
      dts: './types/components.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true
      }
    }),
    VueDevTools()
  ]
})
