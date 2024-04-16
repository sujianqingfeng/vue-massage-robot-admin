<script setup>
import { usePermissionMenus } from '../use-permissions'
import { fetchRoleDetailApi } from '~/api'

const formRef = ref(null)
const form = ref({
  roleName: '',
  permCode: '',
  menuIds: []
})
const rules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  permCode: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
  menuIds: [{ required: true, message: '请选择权限', trigger: 'blur' }]
}
const { menus } = usePermissionMenus()

const fetchRoleDetail = async (id) => {
  if (!id) {
    return
  }
  const { error, data } = await fetchRoleDetailApi(id)
  if (error) {
    return
  }
  form.value = data
}

const show = ({ id } = {}) => {
  fetchRoleDetail(id)
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
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="form.roleName" placeholder="请输入角色名称" />
    </el-form-item>

    <el-form-item label="权限标识" prop="permCode">
      <el-input
        v-model="form.permCode"
        placeholder="请输入权限标识"
        maxlength="50"
      />
    </el-form-item>

    <el-form-item label="权限" prop="menuIds">
      <el-tree-select
        v-model="form.menuIds"
        :data="menus"
        multiple
        :render-after-expand="false"
        show-checkbox
        placeholder="请选择权限"
      />
    </el-form-item>
  </el-form>
</template>
