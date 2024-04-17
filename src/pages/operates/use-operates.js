import { fetchOperatorDetailApi } from '~/api'

export const useOperatorDetail = () => {
  const { result: detail, fetchApi: fetchOperatorDetail } = useRequest({
    apiFn: fetchOperatorDetailApi,
    autoFetch: false
  })

  return {
    detail,
    fetchOperatorDetail
  }
}
