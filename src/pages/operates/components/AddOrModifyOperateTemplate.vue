<script setup>
import { useOperatorDetail } from '../use-operates'

const formRef = ref(null)
const form = ref({
  principal: '',
  cellPhone: '',
  address: '',
  name: ''
})
const rules = {
  name: [{ required: true, message: '请输入运营商名称', trigger: 'blur' }],
  principal: [
    { required: true, message: '请输入运营商负责人', trigger: 'blur' }
  ],
  cellPhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
}

const { fetchOperatorDetail, detail } = useOperatorDetail()

const show = async ({ id }) => {
  console.log('show')

  if (id) {
    await fetchOperatorDetail(id)
    form.value = detail.value
  }
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
    <el-form-item label="运营商名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入运营商名称" />
    </el-form-item>

    <el-form-item label="运营商负责人" prop="principal">
      <el-input
        v-model="form.principal"
        maxlength="20"
        placeholder="请输入运营商负责人"
      />
    </el-form-item>

    <el-form-item label="手机号码" prop="cellPhone">
      <el-input v-model="form.cellPhone" placeholder="请输入手机号码" />
    </el-form-item>

    <el-form-item label="地址" prop="address">
      <el-input
        v-model="form.address"
        maxlength="50"
        placeholder="请输入地址"
      />
    </el-form-item>
  </el-form>
</template>
