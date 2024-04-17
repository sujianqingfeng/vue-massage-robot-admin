import { fetchShopAllApi, fetchShopDetailApi } from '~/api'

export const useShopDetail = () => {
  const { result: detail, fetchApi: fetchShopDetail } = useRequest({
    apiFn: fetchShopDetailApi,
    autoFetch: false
  })

  return {
    detail,
    fetchShopDetail
  }
}

export const useShopTreeOptions = () => {
  const { result: options } = useRequest({
    apiFn: fetchShopAllApi,
    autoFetch: true,
    defaultResult: []
  })

  return {
    options
  }
}
