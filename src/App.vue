<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :local="zhCn">
    <router-view />
  </el-config-provider>
</template>
