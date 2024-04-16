export const useQuery = ({
  defaultForm,
  fetchListApi,
  autoFetch = true
} = {}) => {
  const queryForm = ref({
    ...defaultForm
  })

  const onReset = () => {
    queryForm.value = { ...defaultForm }
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
