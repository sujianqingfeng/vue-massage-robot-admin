import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import 'virtual:uno.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory()
})

createApp(App).use(router).mount('#app')
