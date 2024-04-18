import { get } from '~/utils/basic'

export const useOptions = (map) => {
  const mapLabel = (value) => {
    return map[value]
  }

  const getOptions = (isNumber = false) => {
    return Object.entries(map).map(([value, label]) => {
      return {
        value: isNumber ? Number(value) : value,
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
      if (typeof item.value === 'string' && item.value) {
        newItem.value = get(info.value, item.value, item.defaultValue || '')
      }
      return newItem
    })
  })

  return {
    options
  }
}
