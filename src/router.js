import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('./pages/login.vue')
    },
    {
      path: '/',
      component: () => import('./pages/index.vue'),
      children: [
        {
          path: '/dashboard',
          component: () => import('./pages/dashboard/index.vue')
        },
        {
          path: '/orders',
          children: [
            {
              path: '',
              component: () => import('./pages/orders/index.vue')
            },
            {
              path: 'detail',
              component: () => import('./pages/orders/detail.vue')
            }
          ]
        },
        {
          path: '/devices',
          component: () => import('./pages/devices/index.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./pages/not-found.vue')
    }
  ]
})

export default router
