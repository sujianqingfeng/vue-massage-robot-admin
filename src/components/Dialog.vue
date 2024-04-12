<script setup>
const emit = defineEmits(['confirm', 'cancel'])

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const dialogVisible = defineModel({ type: Boolean, default: false })

const onCancel = () => {
  dialogVisible.value = false
  emit('cancel')
}
const onConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <el-dialog v-model="dialogVisible">
    <slot></slot>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
