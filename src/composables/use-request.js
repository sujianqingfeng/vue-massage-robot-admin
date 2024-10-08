export const useRequest = ({
  apiFn,
  params = {},
  defaultResult = {},
  afterFetch = null,
  autoFetch = false
} = {}) => {
  if (!apiFn) {
    throw new Error('apiFN is required')
  }

  const result = ref(defaultResult)
  const loading = ref(false)

  const fetchApi = async (params) => {
    loading.value = true

    const { data, error } = await apiFn(params)
    if (error) {
      loading.value = false
      return { data, error }
    }
    loading.value = false
    result.value = afterFetch ? afterFetch(data) : data

    return { data, error }
  }

  if (autoFetch) {
    fetchApi(params)
  }

  return {
    loading,
    result,
    fetchApi
  }
}

const transformPaginationParams = (pagination) => {
  const { pageSize, currentPage: pageNo } = pagination
  return { current: pageNo, size: pageSize }
}

export const useRequestList = ({
  apiFn,
  autoFetch = true,
  params = {},
  defaultResult = [],
  afterFetch = null,
  autoFetchAfterReset = true
} = {}) => {
  if (!apiFn) {
    throw new Error('apiFn is required')
  }

  const form = ref({
    ...params
  })

  const pagination = ref({
    pageSize: 20,
    currentPage: 1
  })

  const finished = ref(false)
  const total = ref(0)

  const {
    loading,
    fetchApi,
    result: list
  } = useRequest({
    apiFn,
    autoFetch: false,
    defaultResult,
    afterFetch: (data) => {
      const {
        records: content,
        current: pageNo,
        pages: totalPage,
        total: totalRecord
      } = data

      finished.value = pageNo >= totalPage
      total.value = totalRecord

      return afterFetch ? afterFetch(content) : content
    }
  })

  const fetchListApi = async (params) => {
    const { error, data } = await fetchApi({
      ...transformPaginationParams(pagination.value),
      ...params
    })
    return { error, data }
  }

  const resetPagination = () => {
    finished.value = false
    pagination.value = {
      pageSize: 20,
      currentPage: 1
    }
  }

  const onReset = () => {
    form.value = { ...params }
    resetPagination()
    autoFetchAfterReset && onQuery()
  }

  const onQuery = () => {
    fetchListApi(form.value)
  }

  if (autoFetch) {
    onQuery()
  }

  return {
    loading,
    total,
    pagination,
    list,
    finished,
    form,
    fetchListApi,
    resetPagination,
    onReset,
    onQuery
  }
}
