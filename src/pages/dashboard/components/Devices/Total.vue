<script setup>
import { fetchDeviceCountApi } from '~/api'

const eChartRef = ref(null)

const renderChart = (data) => {
  const { total, online, fault, offline } = data

  eChartRef.value?.setOption({
    color: ['#26CCB9', '#F05D2F', '#2F93F0'],
    title: {
      text: total,
      subtext: '设备总数',
      top: '32%',
      left: 'center',
      textStyle: {
        fontSize: '16',
        fontWeight: 'bold'
      },
      subTextStyle: {
        fontSize: '8'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    textStyle: {
      rich: {
        name: {
          fontSize: 12
        },
        value: {
          fontSize: 14,
          fontweight: 'bold'
        }
      }
    },
    legend: {
      orient: 'vertical',
      bottom: '0',
      icon: 'circle',
      itemWidth: 5,
      itemHeight: 5,
      formatter: function (name) {
        const label = {
          online: '在线设备',
          fault: '故障设备',
          offline: '离线设备'
        }
        return `{name|${label[name]}} {value|${data[name]}}`
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: online, name: 'online' },
          { value: fault, name: 'fault' },
          { value: offline, name: 'offline' }
        ]
      }
    ]
  })
}

const fetchDeviceCount = async () => {
  const { error, data } = await fetchDeviceCountApi()
  if (error) {
    return
  }
  renderChart(data)
}

onMounted(fetchDeviceCount)
</script>

<template>
  <div class="w-60 p-6 border-r h-full">
    <div class="color-#0D1926 text-4.5 leading-5.27 font-bold">设备总数</div>
    <div class="flex justify-center items-center h-full">
      <EChartsWrapper ref="eChartRef" class="w-24 h-60" />
    </div>
  </div>
</template>
