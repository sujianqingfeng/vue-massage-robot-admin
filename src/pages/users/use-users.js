import { fetchOperatorWithStoreTreeApi } from '~/api'

export const useUserStatusOptions = () => {
  const { mapLabel: mapUserStatusLabel, getOptions: getUserStatusOptions } =
    useOptions({
      1: '正常',
      0: '禁用'
    })

  return {
    mapUserStatusLabel,
    getUserStatusOptions
  }
}

export const useUserDepartOptions = () => {
  const { result } = useRequest({
    apiFn: fetchOperatorWithStoreTreeApi,
    autoFetch: true
  })

  return {
    result
  }
}
