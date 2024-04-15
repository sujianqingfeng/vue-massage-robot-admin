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
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入角色名称" />
    </el-form-item>

    <el-form-item label="权限" prop="name">
      <el-select v-model="form.name" placeholder="请选择权限">
        <el-option label="全部" value="all" />
        <el-option label="待支付" value="unpaid" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
