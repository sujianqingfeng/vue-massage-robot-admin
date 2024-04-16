<script setup>
const formRef = ref(null)
const form = ref({
  adminNo: '',
  account: '',
  adminName: '',
  roleNo: '',
  passwordPlaintext: '',
  status: ''
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
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="5rem"
    label-position="left"
  >
    <el-form-item label="登录账号" prop="name">
      <el-input v-model="form.name" placeholder="请输入登录账号" />
    </el-form-item>

    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="form.name" placeholder="请输入用户姓名" />
    </el-form-item>

    <el-form-item label="角色" prop="name">
      <el-select v-model="form.name" placeholder="请选择角色">
        <el-option label="全部" value="all" />
        <el-option label="待支付" value="unpaid" />
      </el-select>
    </el-form-item>

    <el-form-item label="所属单位" prop="name">
      <el-select v-model="form.name" placeholder="请选择所属单位">
        <el-option label="全部" value="all" />
        <el-option label="待支付" value="unpaid" />
      </el-select>
    </el-form-item>

    <el-form-item label="登录密码" prop="name">
      <el-input v-model="form.name" placeholder="请输入登录密码" />
    </el-form-item>

    <el-form-item label="状态" prop="name">
      <el-select v-model="form.name" placeholder="请选择状态">
        <el-option label="全部" value="all" />
        <el-option label="待支付" value="unpaid" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
