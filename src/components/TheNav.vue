<script setup>
const MENUS = [
  {
    name: '信息统计',
    icon: 'i-cp-info',
    path: '/dashboard'
  },
  {
    name: '订单管理',
    icon: 'i-cp-order',
    path: '/orders'
  },
  {
    name: '设备管理',
    icon: 'i-cp-device',
    path: '/devices'
  },
  {
    name: '权限管理',
    icon: 'i-cp-permission',
    path: '/permissions'
  },
  {
    name: '用户管理',
    icon: 'i-cp-user',
    path: '/users'
  },
  {
    name: '运营商管理',
    icon: 'i-cp-operating',
    path: '/operates'
  },
  {
    name: '门店管理',
    icon: 'i-cp-shop',
    path: '/shops'
  }
]

let defaultActive = ''
const route = useRoute()
const current = route.matched[1]
if (current) {
  defaultActive = current.path
}
</script>

<template>
  <el-menu :default-active="defaultActive" router>
    <el-menu-item v-for="item in MENUS" :key="item.path" :index="item.path">
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
