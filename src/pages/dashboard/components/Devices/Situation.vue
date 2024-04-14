<script setup>
const v = ref(null)
const eChartRef = ref(null)

onMounted(() => {
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      },
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  })
})
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
        <DateRange />
      </div>
      <div class="w-18">
        <el-select v-model="v" placeholder="Select">
          <el-option key="item.value" label="今日" value="item.value" />
        </el-select>
      </div>
    </div>
  </div>

  <div class="h-90%">
    <EChartsWrapper ref="eChartRef" class="w-full h-full" />
  </div>
</template>
