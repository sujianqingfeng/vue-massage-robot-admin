<script setup>
const formRef = ref(null)
const form = ref({
  principal: '',
  cellPhone: ''
})
const rules = {
  name: [{ required: true, message: '请输入运营商名称', trigger: 'blur' }],
  principal: [
    { required: true, message: '请输入运营商负责人', trigger: 'blur' }
  ]
}

const show = async ({ id }) => {
  console.log('show')
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
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="left"
    label-width="7rem"
  >
    <el-form-item label="最新版本" prop="name">
      <el-input v-model="form.name" placeholder="请输入最新版本" />
    </el-form-item>

    <el-form-item label="上一版本" prop="cellPhone">
      <el-input v-model="form.cellPhone" placeholder="请输入上一版本" />
    </el-form-item>
  </el-form>
</template>
