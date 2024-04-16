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
      redirect: '/dashboard',
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
          children: [
            {
              path: '',
              component: () => import('./pages/devices/index.vue')
            },
            {
              path: 'error-code-record',
              component: () => import('./pages/devices/error-code-record.vue')
            }
          ]
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
          children: [
            {
              path: '',
              component: () => import('./pages/operates/index.vue')
            },
            {
              path: 'shops',
              component: () => import('./pages/operates/shops.vue')
            }
          ]
        },
        {
          path: '/shops',
          children: [
            {
              path: '',
              component: () => import('./pages/shops/index.vue')
            },
            {
              path: 'devices',
              component: () => import('./pages/shops/devices.vue')
            }
          ]
        },
        {
          path: '/shop-records',
          component: () => import('./pages/shop-records/index.vue')
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
