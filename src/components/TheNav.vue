<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const MENUS = [
  {
    name: '信息统计',
    icon: 'i-cp-info',
    path: '/dashboard',
    permission: 'count'
  },
  {
    name: '订单管理',
    icon: 'i-cp-order',
    path: '/orders',
    permission: 'order'
  },
  {
    name: '设备管理',
    icon: 'i-cp-device',
    path: '/devices',
    permission: 'equipment'
  },
  {
    name: '权限管理',
    icon: 'i-cp-permission',
    path: '/permissions',
    permission: 'permission'
  },
  {
    name: '用户管理',
    icon: 'i-cp-user',
    path: '/users',
    permission: 'admin'
  },
  {
    name: '运营商管理',
    icon: 'i-cp-operating',
    path: '/operates',
    permission: 'operator'
  },
  {
    name: '门店管理',
    icon: 'i-cp-shop',
    path: '/shops',
    permission: 'store'
  },
  {
    name: '门店消费记录',
    icon: 'i-ri-bank-card-line',
    path: '/shop-records',
    permission: 'storeOrder'
  },
  {
    name: '软件版本管理',
    icon: 'i-carbon-version',
    path: '/versions',
    permission: 'storeOrder'
  }
]

const menus = computed(() =>
  MENUS.filter((item) => {
    return (user.value.menus || []).includes(item.permission)
  })
)

let defaultActive = ''
const route = useRoute()
const current = route.matched[1]
if (current) {
  defaultActive = current.path
}
</script>

<template>
  <el-menu :default-active="defaultActive" router>
    <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
      <div class="flex items-center gap-2">
        <div class="text-5" :class="item.icon"></div>
        <span class="text-3.5 leading-4.5">{{ item.name }}</span>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  --at-apply: h-full;
}
.el-menu .el-menu-item {
  --at-apply: border-l-2 border-transparent;
}
.el-menu .el-menu-item.is-active {
  --at-apply: bg-#0083FF/10 border-l-2 border-#0083FF;
}
</style>
