<script setup>
const formRef = ref(null)
const form = ref({
  ids: [],
  equipNo: ''
})
const rules = {
  equipNo: [{ required: true, message: '请输入机器编号', trigger: 'blur' }]
}

const show = async ({ ids }) => {
  form.value.ids = ids
}

const onConfirm = async () => {
  await formRef.value.validate()

  return form.value
}

defineExpose({
  show,
  onConfirm
})
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item prop="equipNo">
      <el-input
        v-model="form.equipNo"
        type="textarea"
        maxlength="2000"
        rows="5"
        placeholder="请输入更新软件命令，限制2000字"
      />
    </el-form-item>
  </el-form>
</template>
