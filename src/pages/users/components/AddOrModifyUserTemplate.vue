<script setup>
import { useUserDepartOptions, useUserStatusOptions } from '../use-users'
import { fetchRoleOptionsApi } from '~/api'

const formRef = ref(null)
const form = ref({
  account: '',
  adminName: '',
  roleNo: '',
  passwordPlaintext: '',
  status: ''
})
const rules = {
  account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
  adminName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
  roleNo: [{ required: true, message: '请选择角色', trigger: 'change' }],
  passwordPlaintext: [
    { required: true, message: '请输入登录密码', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

const { getUserStatusOptions } = useUserStatusOptions()
useUserDepartOptions()

const { result: roleOptions } = useRequest({
  apiFn: fetchRoleOptionsApi,
  autoFetch: true
})

const show = () => {
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
    label-width="5rem"
    label-position="left"
  >
    <el-form-item label="登录账号" prop="account">
      <el-input v-model="form.account" placeholder="请输入登录账号" />
    </el-form-item>

    <el-form-item label="用户姓名" prop="adminName">
      <el-input v-model="form.adminName" placeholder="请输入用户姓名" />
    </el-form-item>

    <el-form-item label="角色" prop="roleNo">
      <el-select v-model="form.roleNo" placeholder="请选择角色">
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- <el-form-item label="所属单位" prop="name">
      <el-select v-model="form.name" placeholder="请选择所属单位">
        <el-option label="全部" value="all" />
        <el-option label="待支付" value="unpaid" />
      </el-select>
    </el-form-item> -->

    <el-form-item label="登录密码" prop="passwordPlaintext">
      <el-input v-model="form.passwordPlaintext" placeholder="请输入登录密码" />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <SelectWithOptions
        v-model="form.status"
        placeholder="请选择状态"
        :options="getUserStatusOptions()"
      />
    </el-form-item>
  </el-form>
</template>
