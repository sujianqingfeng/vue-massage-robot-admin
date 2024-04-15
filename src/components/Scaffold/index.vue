<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  total: {
    type: Number,
    default: 0
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
  <div class="bg-white rounded-1 p-6 h-full flex flex-col">
    <slot name="query"></slot>

    <slot name="title">
      <div
        v-if="title"
        class="color-#1E1E1E text-4.5 leading-5.27 font-bold my-6"
      >
        {{ title }}
      </div>
    </slot>

    <div class="flex-auto">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <slot name="table" :width="width" :height="height"></slot>
        </template>
      </el-auto-resizer>
    </div>
    <slot name="pagination">
      <div class="flex justify-end py-2">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          small
          background
          layout="prev, pager, next"
          :total="total"
        />
      </div>
    </slot>
  </div>
</template>
