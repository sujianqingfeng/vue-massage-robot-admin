import { fetchDictionaryListApi } from '~/api'

export const useDictOptions = (dicId) => {
  const { result } = useRequest({
    apiFn: fetchDictionaryListApi,
    autoFetch: true,
    defaultResult: [],
    params: {
      dicId
    }
  })

  const options = computed(() =>
    result.value.map((item) => {
      const { dictLabel, dictValue } = item
      return {
        label: dictLabel,
        value: dictValue
      }
    })
  )

  return {
    options
  }
}
