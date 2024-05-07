<script setup>
import {
  useUserDepartOptions,
  useUserStatusOptions,
  useUserDetail
} from '../use-users'
import { fetchRoleOptionsApi } from '~/api'

const formRef = ref(null)
const form = ref({
  account: '',
  adminName: '',
  roleNo: '',
  passwordPlaintext: '',
  status: '',
  depart: ''
})
const rules = {
  account: [
    { required: true, message: '请输入登录账号', trigger: 'blur' },
    { min: 6, message: '长度在 6 到 18 个字符', trigger: 'blur' },
    { max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
  ],
  adminName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
  roleNo: [{ required: true, message: '请选择角色', trigger: 'change' }],
  passwordPlaintext: [
    { required: true, message: '请输入登录密码', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  depart: [{ required: true, message: '请选择所属单位', trigger: 'change' }]
}

const { getUserStatusOptions } = useUserStatusOptions()
const { departTreeOptions } = useUserDepartOptions()
const { fetchUserDetail, detail } = useUserDetail()

const { result: roleOptions } = useRequest({
  apiFn: fetchRoleOptionsApi,
  autoFetch: true,
  defaultResult: []
})

const show = async ({ id } = {}) => {
  if (id) {
    await fetchUserDetail(id)
    form.value = { ...detail.value }
  }
}

const onConfirm = async () => {
  await formRef.value.validate()
  const data = { ...form.value }
  data.status = +data.status
  // data.depart = data.depart.join(',')
  return data
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
      <el-input
        v-model="form.account"
        placeholder="请输入登录账号"
        minlength="6"
        maxlength="18"
      />
    </el-form-item>

    <el-form-item label="用户姓名" prop="adminName">
      <el-input v-model="form.adminName" placeholder="请输入用户姓名" />
    </el-form-item>

    <el-form-item label="角色" prop="roleNo">
      <SelectWithOptions
        v-model="form.roleNo"
        placeholder="请选择角色"
        :options="roleOptions"
      />
    </el-form-item>

    <el-form-item label="所属单位" prop="depart">
      <el-tree-select
        v-model="form.depart"
        placeholder="请选择所属单位"
        :data="departTreeOptions"
        :render-after-expand="false"
        show-checkbox
      />
    </el-form-item>

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
