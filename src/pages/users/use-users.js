import { fetchOperatorWithStoreTreeApi, fetchUserDetailApi } from '~/api'

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
  const { result: departTreeOptions } = useRequest({
    apiFn: fetchOperatorWithStoreTreeApi,
    autoFetch: true,
    defaultResult: []
  })

  return {
    departTreeOptions
  }
}

export const useUserDetail = () => {
  const { result: detail, fetchApi: fetchUserDetail } = useRequest({
    apiFn: fetchUserDetailApi,
    autoFetch: false
  })

  return {
    detail,
    fetchUserDetail
  }
}
