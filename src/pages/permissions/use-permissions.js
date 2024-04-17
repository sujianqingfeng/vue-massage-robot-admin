import { fetchMenuListApi, fetchRoleAssignMenuIdsApi } from '~/api'

export const usePermissionMenus = () => {
  const { result } = useRequest({
    apiFn: fetchMenuListApi,
    autoFetch: true,
    defaultResult: []
  })

  const defaultProps = {
    children: 'children',
    label: 'menuName',
    value: 'menuId'
  }

  const menus = computed(() => {
    return result.value.map((item) => {
      const newItem = {}
      Object.keys(defaultProps).forEach((key) => {
        newItem[key] = item[defaultProps[key]]
      })
      return newItem
    })
  })

  return {
    menus
  }
}

export const useRolePermissions = () => {
  const { result: permissions, fetchApi: fetchRoleAssignMenuIds } = useRequest({
    apiFn: fetchRoleAssignMenuIdsApi,
    autoFetch: false,
    defaultResult: []
  })

  return {
    fetchRoleAssignMenuIds,
    permissions
  }
}
