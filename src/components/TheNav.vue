<script setup>
const MENUS = [
  {
    name: '信息统计',
    path: '/dashboard'
  },
  {
    name: '订单管理',
    path: '/orders'
  },
  {
    name: '设备管理',
    path: 'devices'
  }
]

const defaultActive = ref('/dashboard')
</script>

<template>
  <el-menu :default-active="defaultActive" router>
    <el-menu-item v-for="item in MENUS" :key="item.path" :index="item.path">
      <div>
        {{ item.name }}
      </div>
    </el-menu-item>
  </el-menu>
</template>
