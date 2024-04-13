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

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const eChartRef = ref(null)

onMounted(() => {
  const myChart = echarts.init(eChartRef.value)

  myChart.setOption({
    color: ['#248CFD', '#04C7B2'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },

    legend: {
      data: ['Line 1', 'Line 2']
    },
    grid: {
      left: '0%',
      right: '1%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Line 1',
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
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
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
        data: [220, 302, 181, 234, 210, 290, 150]
      }
    ]
  })
})
</script>

<template>
  <div class="text-4.5 color-#0D1926 font-bold leading-5.27">订单趋势</div>

  <div>
    <div ref="eChartRef" class="w-full h-60"></div>
  </div>
</template>
