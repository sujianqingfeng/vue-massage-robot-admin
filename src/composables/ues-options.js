export const useOptions = (map) => {
  const mapLabel = (value) => {
    return map[value]
  }

  const getOptions = () => {
    return Object.entries(map).map(([value, label]) => {
      return {
        value,
        label
      }
    })
  }

  return {
    mapLabel,
    getOptions
  }
}

export const useTransformOptions = ({ info, maps }) => {
  const options = computed(() => {
    return maps.map((item) => {
      const newItem = { ...item }
      if (typeof item.value === 'string') {
        newItem.value = info.value[item.value]
      }
      return newItem
    })
  })

  return {
    options
  }
}
