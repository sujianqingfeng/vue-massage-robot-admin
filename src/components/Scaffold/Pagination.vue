<script setup>
defineProps({
  total: {
    type: Number,
    default: 0
  },
  layout: {
    type: String,
    default: 'prev, pager, next'
  }
})
const pagination = defineModel('pagination', {
  type: Object,
  default: () => ({
    pageSize: 20,
    currentPage: 1
  })
})
</script>

<template>
  <el-pagination
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    small
    background
    :layout="layout"
    :total="total"
  />
</template>
