import { createApp } from 'vue'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import './assets/global.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
