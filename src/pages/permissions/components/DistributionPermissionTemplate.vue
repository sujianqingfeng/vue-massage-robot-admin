<script setup>
import { usePermissionMenus, useRolePermissions } from '../use-permissions'

const options = ref({})
const treeRef = ref(null)
const { menus } = usePermissionMenus()
const { fetchRoleAssignMenuIds } = useRolePermissions()

const show = (_options) => {
  options.value = _options
  fetchRoleAssignMenuIds({ roleNo: _options.id })
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
  <el-tree ref="treeRef" show-checkbox :data="menus" />
</template>
