<script setup>
const emit = defineEmits(['update:visible'])

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const dialogVisible = useVModel(props, 'visible', emit)
</script>

<template>
  <el-dialog v-model:visible="dialogVisible">
    <slot></slot>
  </el-dialog>
</template>
