<script setup>
import { BarChart, PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  BarChart,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent
])

const wrapperRef = ref(null)
const instanceChart = ref(null)

onMounted(() => {
  instanceChart.value = echarts.init(wrapperRef.value)
})

const setOption = (option) => {
  instanceChart.value?.setOption(option)
}

defineExpose({
  setOption
})
</script>

<template>
  <div ref="wrapperRef"></div>
</template>
