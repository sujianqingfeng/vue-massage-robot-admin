import { fetchOperatorAllApi, fetchOperatorDetailApi } from '~/api'

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

export const useOperatorOptions = () => {
  const { result: operatorOptions } = useRequest({
    apiFn: fetchOperatorAllApi,
    autoFetch: true,
    defaultResult: []
  })

  return {
    operatorOptions
  }
}
