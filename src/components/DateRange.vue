<script setup>
const emits = defineEmits(['update:start', 'update:end'])
const props = defineProps({
  valueFormat: {
    type: String,
    default: 'HH:mm:ss'
  },
  start: {
    type: String,
    default: ''
  },
  end: {
    type: String,
    default: ''
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
  }
})

const tempDate = computed({
  get: () => {
    return [props.start, props.end]
  },
  set: (val) => {
    if (!val) {
      emits('update:start', '')
      emits('update:end', '')
      return
    }

    emits('update:start', val[0])
    emits('update:end', val[1])
  }
})
</script>

<template>
  <el-date-picker
    v-model="tempDate"
    :type="type"
    v-bind="$attrs"
    :style="{ width }"
    :clearable="clearable"
    :format="valueFormat"
    :value-format="valueFormat"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
  />
</template>
