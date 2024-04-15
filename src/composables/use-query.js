export const useQuery = ({ defaultForm } = {}) => {
  const queryForm = ref({
    ...defaultForm
  })

  const onReset = () => {
    queryForm.value = { ...defaultForm }
  }

  return {
    queryForm,
    onReset
  }
}
