<script setup>
import { useShopDetail } from '../use-shops'
import { useOperatorOptions } from '~/pages/operates/use-operates'

const formRef = ref(null)
const form = ref({
  name: '',
  operatorNo: '',
  principal: '',
  cellPhone: '',
  storeType: '',
  address: ''
})
const rules = {
  name: [{ required: true, message: '请输入门店/个体名称', trigger: 'blur' }],
  operatorNo: [{ required: true, message: '请选择运营商', trigger: 'change' }],
  principal: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  cellPhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  storeType: [{ required: true, message: '请选择类型', trigger: 'change' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
}

const { options: typeOptions } = useDictOptions('store_category')
const { operatorOptions } = useOperatorOptions()
const { detail, fetchShopDetail } = useShopDetail()

const show = async ({ id }) => {
  if (id) {
    await fetchShopDetail(id)
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
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item label="门店/个体名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入门店/个体名称" />
    </el-form-item>

    <el-form-item label="负责人" prop="principal">
      <el-input v-model="form.principal" placeholder="请输入负责人" />
    </el-form-item>

    <el-form-item label="手机号码" prop="cellPhone">
      <el-input v-model="form.cellPhone" placeholder="请输入手机号码" />
    </el-form-item>

    <el-form-item label="类型" prop="storeType">
      <SelectWithOptions
        v-model="form.storeType"
        :options="typeOptions"
        placeholder="请选择类型"
      />
    </el-form-item>

    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address" placeholder="请输入地址" />
    </el-form-item>

    <el-form-item label="运营商" prop="operatorNo">
      <SelectWithOptions
        v-model="form.operatorNo"
        :options="operatorOptions"
        placeholder="请选择运营商"
      />
    </el-form-item>
  </el-form>
</template>
