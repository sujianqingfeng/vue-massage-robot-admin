import { fetchShopDetailApi } from '~/api'

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
