<script setup>
const emit = defineEmits(['paginationChange'])

defineProps({
  title: {
    type: String,
    default: ''
  },
  total: {
    type: Number,
    default: 0
  },
  padding: {
    type: String,
    default: '1.5rem'
  },
  back: {
    type: Boolean,
    default: false
  }
})

const pagination = defineModel('pagination', {
  type: Object,
  default: () => ({
    pageSize: 20,
    currentPage: 1
  })
})

const onPaginationChange = () => {
  emit('paginationChange')
}
const slots = useSlots()

const router = useRouter()
const onBack = () => {
  router.back()
}
</script>

<template>
  <div :style="{ padding }" class="bg-white rounded-1 h-full flex flex-col">
    <div v-if="slots.query" class="mb-6">
      <slot name="query"></slot>
    </div>

    <div
      v-if="slots.title || title"
      class="flex justify-between items-center mb-6"
    >
      <slot name="title">
        <div class="color-#1E1E1E flex justify-start items-center gap-2">
          <button
            v-if="back"
            class="i-ri-arrow-left-circle-line text-6"
            @click="onBack"
          ></button>

          <p class="text-4.5 leading-5.27 font-bold">{{ title }}</p>
        </div>
      </slot>
      <div>
        <slot name="operation"></slot>
      </div>
    </div>

    <div class="flex-auto">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <slot name="table" :width="width" :height="height"></slot>
        </template>
      </el-auto-resizer>
    </div>
    <slot name="pagination">
      <div class="flex justify-end py-2">
        <Pagination
          :pagination="pagination"
          :total="total"
          @change="onPaginationChange"
        />
      </div>
    </slot>

    <slot name="footer"></slot>
  </div>
</template>
