export const useTableSelection = () => {
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

export const useTableColumnFormatter = () => {
  const createSuffixTableColumnFormatter = (suffix) => {
    return (_row, _column, cell) => {
      return `${cell}${suffix}`
    }
  }

  return {
    createSuffixTableColumnFormatter
  }
}
