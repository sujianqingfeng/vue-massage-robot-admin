export const useDashboardPeriod = () => {
  const period = ref('')
  const day1 = ref('')
  const day2 = ref('')

  const PERIOD_OPTIONS = [
    {
      label: '今日',
      value: 'day'
    },
    {
      label: '本周',
      value: 'week'
    },
    {
      label: '本月',
      value: 'month'
    }
  ]

  const transformPeriod = () => {
    const params = PERIOD_OPTIONS.reduce((pre, cur) => {
      if (cur.value === period.value) {
        pre[cur.value] = true
      }

      return pre
    }, {})

    if (period.value) {
      return params
    }

    return {
      day1: day1.value,
      day2: day2.value
    }
  }

  return {
    day1,
    day2,
    period,
    transformPeriod,
    PERIOD_OPTIONS
  }
}
