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
    <el-form-item label="门店/个体名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入门店/个体名称" />
    </el-form-item>

    <el-form-item label="负责人" prop="name">
      <el-input v-model="form.name" placeholder="请输入负责人" />
    </el-form-item>

    <el-form-item label="手机号码" prop="name">
      <el-input v-model="form.name" placeholder="请输入手机号码" />
    </el-form-item>

    <el-form-item label="类型" prop="name">
      <el-select v-model="form.name" placeholder="请选择类型">
        <el-option label="全部" value="all" />
        <el-option label="待支付" value="unpaid" />
      </el-select>
    </el-form-item>

    <el-form-item label="地址" prop="name">
      <el-input v-model="form.name" placeholder="请输入地址" />
    </el-form-item>

    <el-form-item label="运营商" prop="name">
      <el-select v-model="form.name" placeholder="请选择运营商">
        <el-option label="全部" value="all" />
        <el-option label="待支付" value="unpaid" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
