<script setup>
import { fetchOrderAmountApi } from '~/api'

const items = ref([
  {
    icon: 'i-cm-total-amount',
    title: '总营业额（万元）',
    value: 'total',
    single: ''
  },
  {
    icon: 'i-cm-today-amount',
    title: '今日营业额（万元）',
    value: 'day',
    single: ''
  },
  {
    icon: 'i-cm-month-amount',
    title: '本月营业额（万元）',
    value: 'month'
  },
  {
    icon: 'i-cm-quarter-amount',
    title: '本季营业额（万元）',
    value: 'quarter'
  },
  {
    icon: 'i-cm-year-amount',
    title: '本年营业额（万元）',
    value: 'year'
  }
])

const { result } = useRequest({
  apiFn: fetchOrderAmountApi,
  autoFetch: true
})
</script>

<template>
  <div class="flex gap-2 w-full">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="bg-white flex-auto p-5 rounded-1"
    >
      <div class="text-14" :class="item.icon"></div>
      <div class="text-3.5 leading-4.1 color-#0E2041 mt-5">
        {{ item.title }}
      </div>
      <div class="flex mt-1 items-end">
        <div class="text-7 leading-8.2 color-#1E1E1E font-bold">
          {{ result[item.value] }}
        </div>
        <div
          v-if="item.single"
          class="ml-2.5 color-#29C57A leading-4.1 text-3.5"
        >
          +{{ item.single }}
        </div>
      </div>
    </div>
  </div>
</template>
