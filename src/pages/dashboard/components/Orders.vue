<script setup>
import { LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { fetchOrderTendencyLineApi } from '~/api'
import { useDashboardPeriod } from '~/pages/dashboard/use-dashboard'

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const eChartRef = ref(null)

let myChart = null

const renderChart = ({ xaxis, orderCount, orderAmount }) => {
  if (!myChart) {
    myChart = echarts.init(eChartRef.value)
  }

  myChart?.setOption({
    color: ['#248CFD', '#04C7B2'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },

    legend: {
      data: ['订单数', '营业额']
    },
    grid: {
      left: '0%',
      right: '1%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xaxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '订单数',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#248CFD'
        },
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(36, 140, 253, 0.7)'
            },
            {
              offset: 1,
              color: 'rgba(36, 140, 253, 0.1)'
            }
          ])
        },
        data: orderCount
      },
      {
        name: '营业额',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#04C7B2'
        },
        symbol: 'circle',
        symbolSize: 8,

        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(4, 199, 178, 0.7)'
            },
            {
              offset: 1,
              color: 'rgba(4, 199, 178, 0.1)'
            }
          ])
        },
        data: orderAmount
      }
    ]
  })
}

const { PERIOD_OPTIONS, period, day1, day2, transformPeriod } =
  useDashboardPeriod()

const fetchOrderTendencyLine = async () => {
  const params = transformPeriod()
  const { error, data } = await fetchOrderTendencyLineApi(params)
  if (error) {
    return
  }

  const { xaxis = [], orderAmount = [], orderCount = [] } = data || {}

  renderChart({
    xaxis,
    orderAmount,
    orderCount
  })
}

onMounted(fetchOrderTendencyLine)

watch([day1, day2, period], () => {
  fetchOrderTendencyLine()
})
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="text-4.5 color-#0D1926 font-bold leading-5.27">订单趋势</div>
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

  <div class="h-full mt-4">
    <div ref="eChartRef" class="w-full h-full"></div>
  </div>
</template>
