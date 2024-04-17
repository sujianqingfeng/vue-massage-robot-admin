<script setup>
import { usePermissionMenus, useRolePermissions } from '../use-permissions'

const options = ref({})
const treeRef = ref(null)
const { menus } = usePermissionMenus()
const { fetchRoleAssignMenuIds, permissions } = useRolePermissions()

const show = (_options) => {
  options.value = _options
  fetchRoleAssignMenuIds({ roleNo: _options.roleNo })
}

const onConfirm = async () => {
  const menuIds = treeRef.value?.getCheckedNodes().map((node) => node.value)
  return {
    id: options.value.id,
    menuIds
  }
}

defineExpose({
  show,
  onConfirm
})
</script>

<template>
  <el-tree
    ref="treeRef"
    node-key="value"
    :default-checked-keys="permissions"
    show-checkbox
    :data="menus"
  />
</template>
