<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '30rem'
  }
})

const emit = defineEmits(['confirm', 'cancel'])
const dialogVisible = defineModel({ type: Boolean, default: false })
const attrs = useAttrs()

const onCancel = () => {
  dialogVisible.value = false
  emit('cancel')
}
const onConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <el-dialog v-bind="attrs" :width="width" v-model="dialogVisible">
    <slot></slot>

    <template v-if="showFooter" #footer>
      <div class="text-center">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
