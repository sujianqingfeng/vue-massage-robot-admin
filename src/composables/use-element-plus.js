export const useElementPlusTable = () => {
  const tableRef = ref(null)

  const selections = ref([])

  const onSelectionChange = (value) => {
    selections.value = value
  }

  return {
    tableRef,
    selections,
    onSelectionChange
  }
}

export const useDisableDateAfterToday = () => {
  const disabledDateAfterToday = (time) => {
    return time > new Date().getTime()
  }

  return {
    disabledDateAfterToday
  }
}
