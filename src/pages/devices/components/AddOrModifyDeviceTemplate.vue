<script setup>
import { useDeviceDetail } from '../use-devices'
import { useShopTreeOptions } from '~/pages/shops/use-shops'

const formRef = ref(null)
const form = ref({
  equipNo: '',
  name: '',
  storeNo: ''
})
const rules = {
  equipNo: [{ required: true, message: '请输入机器编号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
  storeNo: [{ required: true, message: '请选择所属门店', trigger: 'change' }]
}

const { options } = useShopTreeOptions()
const { detail, fetchDeviceDetail } = useDeviceDetail()

const show = async ({ id } = {}) => {
  if (id) {
    await fetchDeviceDetail(id)
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
    <el-form-item label="机器编号" prop="equipNo">
      <el-input v-model="form.equipNo" placeholder="请输入机器编号" />
    </el-form-item>

    <el-form-item label="设备名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入设备名称" />
    </el-form-item>

    <el-form-item label="所属门店" prop="name">
      <el-tree-select
        v-model="form.storeNo"
        placeholder="请选择所属门店"
        :data="options"
        :render-after-expand="false"
        show-checkbox
      />
    </el-form-item>
  </el-form>
</template>
