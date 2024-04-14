<script setup>
const props = defineProps({
  itemWidth: {
    type: String,
    default: '200px'
  }
})

const emit = defineEmits(['query', 'reset'])

provide('itemWidth', props.itemWidth)

const onQuery = () => {
  emit('query')
}
const onReset = () => {
  emit('reset')
}
</script>

<template>
  <div class="flex items-center flex-wrap gap-2.5">
    <slot></slot>

    <div class="flex">
      <el-button type="primary" @click="onQuery">
        搜索
        <template #icon>
          <button class="i-ri-search-line"></button>
        </template>
      </el-button>
      <el-button @click="onReset">
        重置
        <template #icon>
          <button class="i-carbon-restart"></button>
        </template>
      </el-button>
    </div>
  </div>
</template>
