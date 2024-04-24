<script setup>
import dayjs from 'dayjs'

const start = defineModel('start', { type: String, default: '' })
const end = defineModel('end', { type: String, default: '' })

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  rangeSeparator: {
    type: String,
    default: '-'
  },
  startPlaceholder: {
    type: String,
    default: '开始时间'
  },
  endPlaceholder: {
    type: String,
    default: '结束时间'
  },
  clearable: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '100%'
  },
  type: {
    type: String,
    default: 'daterange'
  },
  withEndTimeOfDay: {
    type: Boolean,
    default: true
  }
})

const dateModalValue = computed({
  get: () => {
    return [start.value, end.value]
  },
  set: (val) => {
    if (!val) {
      start.value = ''
      end.value = ''
      return
    }

    const isDetailTime =
      props.valueFormat.includes('HH:mm:ss') && props.withEndTimeOfDay

    start.value = val[0]
    end.value = isDetailTime
      ? dayjs(val[1]).endOf('day').format(props.valueFormat)
      : val[1]
  }
})

const attrs = useAttrs()
</script>

<template>
  <el-date-picker
    v-model="dateModalValue"
    :type="type"
    v-bind="attrs"
    :style="{ width }"
    :clearable="clearable"
    :format="format"
    :value-format="valueFormat"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
  />
</template>
