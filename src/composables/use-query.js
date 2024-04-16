export const useQuery = ({
  defaultForm,
  fetchListApi,
  resetPagination,
  autoFetch = true
} = {}) => {
  const queryForm = ref({
    ...defaultForm
  })

  const onReset = () => {
    queryForm.value = { ...defaultForm }
    resetPagination()
    autoFetch && onQuery()
  }

  const onQuery = () => {
    fetchListApi(queryForm.value)
  }

  return {
    queryForm,
    onReset,
    onQuery
  }
}
