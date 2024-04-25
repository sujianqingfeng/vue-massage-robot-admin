<script setup>
const formRef = ref(null)
const form = ref({
  oldPwd: '',
  password: ''
})
const rules = {
  oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
}

const show = () => {}

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
    <el-form-item label="原密码" prop="oldPwd">
      <el-input v-model="form.oldPwd" placeholder="请输入原密码" />
    </el-form-item>

    <el-form-item label="新密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入新密码" />
    </el-form-item>
  </el-form>
</template>
