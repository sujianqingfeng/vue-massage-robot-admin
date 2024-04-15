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
          component: () => import('./pages/orders/index.vue')
        },
        {
          path: '/devices',
          component: () => import('./pages/devices/index.vue')
        },
        {
          path: '/permissions',
          component: () => import('./pages/permissions/index.vue')
        },
        {
          path: '/users',
          component: () => import('./pages/users/index.vue')
        },
        {
          path: '/operates',
          component: () => import('./pages/operates/index.vue')
        },
        {
          path: '/shops',
          component: () => import('./pages/shops/index.vue')
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
