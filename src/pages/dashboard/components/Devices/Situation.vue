<script setup>
import { fetchDeviceFaultBarApi } from '~/api'
import { useDashboardPeriod } from '~/pages/dashboard/use-dashboard'

const eChartRef = ref(null)

const renderChart = ({ xaxis, offlineNum, faultNum }) => {
  eChartRef.value?.setOption({
    tooltip: {},
    color: ['#0083FF', '#04C7B2'],
    grid: {
      top: '10%',
      left: '0px',
      right: '0px',
      bottom: '20px'
    },
    xAxis: {
      type: 'category',
      data: xaxis
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: offlineNum,
        type: 'bar'
      },
      {
        data: faultNum,
        type: 'bar'
      }
    ]
  })
}

const fetchDeviceFaultBar = async () => {
  const params = transformPeriod()
  const { error, data } = await fetchDeviceFaultBarApi(params)
  if (error) {
    return
  }

  const { xaxis = [], offlineNum = [], faultNum = [] } = data || {}

  renderChart({
    xaxis,
    offlineNum,
    faultNum
  })
}

const { PERIOD_OPTIONS, period, day1, day2, transformPeriod } =
  useDashboardPeriod()

onMounted(fetchDeviceFaultBar)

watch([day1, day2, period], fetchDeviceFaultBar)
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-3">
        <span class="bg-#0083FF w-6 h-2 inline-block"></span>
        <span class="color-#0E2041 text-3 leading-3.5">离线次数</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="bg-#04C7B2 w-6 h-2 inline-block"></span>
        <span class="color-#0E2041 text-3 leading-3.5">离线次数</span>
      </div>
    </div>

    <div class="flex gap-2.5">
      <div class="w-60">
        <DateRange v-model:start="day1" v-model:end="day2" />
      </div>
      <div class="w-30">
        <SelectWithOptions
          v-model="period"
          :options="PERIOD_OPTIONS"
          clearable
        />
      </div>
    </div>
  </div>

  <div class="h-90%">
    <EChartsWrapper ref="eChartRef" class="w-full h-full" />
  </div>
</template>
