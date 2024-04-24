<script setup>
const formRef = ref(null)
const form = ref({
  eqVersion: '',
  preVersion: ''
})
const rules = {
  eqVersion: [{ required: true, message: '请输入最新版本', trigger: 'blur' }],
  preVersion: [{ required: true, message: '请输入上一版本', trigger: 'blur' }]
}

const show = async () => {}

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
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="left"
    label-width="7rem"
  >
    <el-form-item label="最新版本" prop="eqVersion">
      <el-input v-model="form.eqVersion" placeholder="请输入最新版本" />
    </el-form-item>

    <el-form-item label="上一版本" prop="preVersion">
      <el-input v-model="form.preVersion" placeholder="请输入上一版本" />
    </el-form-item>
  </el-form>
</template>
