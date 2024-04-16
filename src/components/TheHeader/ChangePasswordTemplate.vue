<script setup>
const formRef = ref(null)
const form = ref({
  name: '',
  age: ''
})
const rules = {
  name: [{ required: true, message: '请输入机器编号', trigger: 'blur' }],
  age: [{ required: true, message: '请选择所属门店', trigger: 'blur' }]
}

const show = () => {
  console.log('show')
}

const onConfirm = async () => {
  await formRef.value.validate()
}

defineExpose({
  show,
  onConfirm
})
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item label="原密码" prop="name">
      <el-input v-model="form.name" placeholder="请输入原密码" />
    </el-form-item>

    <el-form-item label="新密码" prop="name">
      <el-input v-model="form.name" placeholder="请输入新密码" />
    </el-form-item>
  </el-form>
</template>
