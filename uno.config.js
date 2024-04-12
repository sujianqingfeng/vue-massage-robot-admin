import presetIcons from '@unocss/preset-icons'
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetAttributify({}), presetUno(), presetIcons()],
  rules: []
})
